import { expect, describe, beforeEach, test, jest } from '@jest/globals';
import request from 'supertest';
import faker from 'faker';
import httpStatus from 'http-status';
import moment from 'moment';
import app from '../../src/app';
import config from '../../src/config/config';
import { tokenService, emailService } from '../../src/services';
import setupTestDB from '../utils/setupTestDB';
import { TokenType } from '../../src/config/tokens';
import { userOne, insertUser } from '../fixtures/user.fixture';
import { tokenRepository, userRepository } from '../../src/repositories';
import { UserInput } from 'models/mongodb/documents/user.model';
// import httpMocks from 'node-mocks-http';
// import bcrypt from 'bcryptjs';
// import { auth } from '../../src/middlewares/auth';
// import ApiError from '../../src/utils/ApiError';
// import { roleRights } from '../../src/config/roles';
// import { userThreeAccessToken, adminAccessToken } from '../fixtures/token.fixture';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';



setupTestDB();

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser: UserInput;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        confirmPassword: 'password1',
      };
      jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue({
        accepted: ['recipient@example.com'],
        rejected: [],
        response: '250 OK id=1lwSI5-0005q6-BB',
        envelope: {
          from: 'sender@example.com',
          to: ['recipient@example.com'],
        },
        pending: [],
        messageId: '<20240325083335.1lwSI5-0005q6-BB@your_computer.local>',
      });
    });
    test('should return 201 and successfully register user if request data is ok', async () => {
      const sendVerificationEmailSpy = jest.spyOn(emailService, 'sendVerificationEmail');
      const res = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);
      const user = res.body;
      expect(sendVerificationEmailSpy).toHaveBeenCalledWith(newUser.email, expect.any(String));

      const verifyEmailToken = sendVerificationEmailSpy.mock.calls[0][1];
      const dbVerifyEmailToken = await tokenRepository.getList({ token: verifyEmailToken, userId: user.id });
      expect(dbVerifyEmailToken[0]).toBeDefined();

      expect(user).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        avatar: '/images/anonymous-avatar.png',
        isEmailVerified: false,
      });

      const dbUser = await userRepository.getById(user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser.toJSON()).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        avatar: '/images/anonymous-avatar.png',
        isEmailVerified: false,
      });

      const tokenString = res.headers['set-cookie'];

      expect(tokenString).toBeDefined();

      let myAccessToken;
      let myRefreshToken;

      for (const item of tokenString) {
        if (item.includes('access_token')) {
          myAccessToken = item.split('=')[1];
        } else if (item.includes('refresh_token')) {
          myRefreshToken = item.split('=')[1];
        }
      }

      expect(myRefreshToken).toBeDefined();
      expect(myAccessToken).toBeDefined();
    });
    test('should return 400 error if username is used', async () => {
      await insertUser(userOne);
      newUser.name = userOne.name;
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if email is already used', async () => {
      await insertUser(userOne);
      newUser.email = userOne.email;
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
      newUser.password = '11111111';
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('POST /v1/auth/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUser(userOne);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };
      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.OK);
      expect(res.body).toEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email,
        avatar: expect.anything(),
        isEmailVerified: false,
      });

      const tokenString = res.headers['set-cookie'];

      expect(tokenString).toBeDefined();

      let myAccessToken;
      let myRefreshToken;

      for (const item of tokenString) {
        if (item.includes('access_token')) {
          myAccessToken = item.split('=')[1];
        } else if (item.includes('refresh_token')) {
          myRefreshToken = item.split('=')[1];
        }
      }

      expect(myRefreshToken).toBeDefined();
      expect(myAccessToken).toBeDefined();
    });
    test('should return 401 error if email or password is wrong', async () => {
      await insertUser(userOne);
      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1',
      };
      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.BAD_REQUEST);
      expect(res.body).toEqual({ code: httpStatus.BAD_REQUEST, message: 'Incorrect email or password' });
    });
  });
  describe('POST /v1/auth/logout', () => {
    
    test('should return 204 if refresh token is valid', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.REFRESH);
      const { id } = await tokenService.saveToken({
        token: refreshToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.REFRESH,
      });
      await request(app)
        .post('/v1/auth/logout')
        .set('Cookie', [`refresh_token=${refreshToken}`])
        .expect(httpStatus.NO_CONTENT);
      const dbRefreshToken = await tokenRepository.getById(id);
      expect(dbRefreshToken).toBe(null);
    });
    test('should return 400 error if refresh token is missing from cookies', async () => {
      await request(app).post('/v1/auth/logout').send().expect(httpStatus.BAD_REQUEST);
    });
    test('should return 404 error if refresh token is not found in the database', async () => {
      if (!userOne.id) throw Error();
      
      await insertUser(userOne);
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.REFRESH);
      await request(app)
        .post('/v1/auth/logout')
        .set('Cookie', [`refresh_token=${refreshToken}`])
        .expect(httpStatus.NOT_FOUND);
    });
    test('should return 404 error if refresh token is blacklisted', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.REFRESH);
      await tokenService.saveToken({
        token: refreshToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.REFRESH,
        blacklisted: true,
      });
      await request(app)
        .post('/v1/auth/logout')
        .set('Cookie', [`refresh_token=${refreshToken}`])
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /v1/auth/forgot-password', () => {
    beforeEach(() => {
      jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue({
        accepted: ['recipient@example.com'],
        rejected: [],
        response: '250 OK id=1lwSI5-0005q6-BB',
        envelope: {
          from: 'sender@example.com',
          to: ['recipient@example.com'],
        },
        pending: [],
        messageId: '<20240325083335.1lwSI5-0005q6-BB@your_computer.local>',
      });
    });
    test('should return 204 and send reset password email to the user', async () => {
      await insertUser(userOne);
      const sendResetPasswordEmailSpy = jest.spyOn(emailService, 'sendResetPasswordEmail');
      await request(app).post('/v1/auth/forgot-password').send({ email: userOne.email }).expect(httpStatus.NO_CONTENT);
      expect(sendResetPasswordEmailSpy).toHaveBeenCalledWith(userOne.email, expect.any(String));
      const resetPasswordToken = sendResetPasswordEmailSpy.mock.calls[0][1];
      const dbResetPasswordTokenData = await tokenRepository.getList({ token: resetPasswordToken, userId: userOne.id });
      expect(dbResetPasswordTokenData[0]).toBeDefined();
    });
    test('should return 400 if email is missing', async () => {
      await insertUser(userOne);
      await request(app).post('/v1/auth/forgot-password').send().expect(httpStatus.BAD_REQUEST);
    });
    test('should return 404 if email does not belong to any user', async () => {
      await request(app).post('/v1/auth/forgot-password').send({ email: userOne.email }).expect(httpStatus.NOT_FOUND);
    });
  });

  describe('GET /v1/auth/new-password', () => {
    beforeEach(() => {
      jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue({
        accepted: ['recipient@example.com'],
        rejected: [],
        response: '250 OK id=1lwSI5-0005q6-BB',
        envelope: {
          from: 'sender@example.com',
          to: ['recipient@example.com'],
        },
        pending: [],
        messageId: '<20240325083335.1lwSI5-0005q6-BB@your_computer.local>',
      });
    });
    test('should return 200 if reset password token is valid', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const sendNewPasswordEmailSpy = jest.spyOn(emailService, 'sendNewPasswordEmail');
      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.RESET_PASSWORD);
      const tokenData = await tokenService.saveToken({
        token: resetPasswordToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.RESET_PASSWORD,
      });
      await request(app).post(`/v1/auth/new-password`).send({ token: resetPasswordToken }).expect(httpStatus.OK);
      const dbToken = await tokenRepository.getById(tokenData.id);
      const dbUser = await userRepository.getById(userOne.id.toString());
      expect(sendNewPasswordEmailSpy).toHaveBeenCalledWith(userOne.email, expect.any(String));
      expect(dbToken).toBeFalsy();
      expect(await dbUser.isPasswordMatch(userOne.password)).toBeFalsy();
    });
    test('should return 401 if token is expired', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().subtract(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.RESET_PASSWORD);
      await request(app).post(`/v1/auth/new-password`).send({ token: resetPasswordToken }).expect(httpStatus.UNAUTHORIZED);
    });
    test('should return 401 if token is not found', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.RESET_PASSWORD);
      const tokenData = await tokenService.saveToken({
        token: resetPasswordToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.RESET_PASSWORD,
      });
      await tokenRepository.destroy(tokenData.id);
      await request(app).post(`/v1/auth/new-password`).send({ token: resetPasswordToken }).expect(httpStatus.UNAUTHORIZED);
    });
  });
  describe('POST /v1/auth/verify-email', () => {
    test('should return 204 and verify the email', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.VERIFY_EMAIL);
      const dbTokenData = await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.VERIFY_EMAIL,
      });
      await request(app).post('/v1/auth/verify-email').send({ token: verifyEmailToken }).expect(httpStatus.NO_CONTENT);
      const dbUser = await userRepository.getById(userOne.id.toString());
      expect(dbUser.isEmailVerified).toBe(true);

      const dbVerifyEmailToken = await tokenRepository.getById(dbTokenData.id);
      expect(dbVerifyEmailToken).toBeNull();
    });
    test('should return 400 if verify email token is missing', async () => {
      await insertUser(userOne);
      await request(app).post('/v1/auth/verify-email').send().expect(httpStatus.BAD_REQUEST);
    });
    test('should return 401 if verify email token is blacklisted', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.VERIFY_EMAIL);
      await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.VERIFY_EMAIL,
        blacklisted: true,
      });
      await request(app).post('/v1/auth/verify-email').send({ token: verifyEmailToken }).expect(httpStatus.UNAUTHORIZED);
    });
    test('should return 401 if verify email token is expired', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().subtract(1, 'minutes');
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenType.VERIFY_EMAIL);
      await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenType.VERIFY_EMAIL,
      });
      await request(app).post('/v1/auth/verify-email').send({ token: verifyEmailToken }).expect(httpStatus.UNAUTHORIZED);
    });
  });
});
// describe('POST /v1/auth/refresh-tokens', () => {
//   test('should return 200 and new auth tokens if refresh token is valid', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH);
//     await tokenService.saveToken(refreshToken, userThree.id, expires, TokenType.REFRESH);
//     const res = await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.OK);
//     expect(res.body).toEqual({
//       access: { token: expect.anything(), expires: expect.anything() },
//       refresh: { token: expect.anything(), expires: expect.anything() },
//     });
//     const dbRefreshTokenDoc = await Token.findOne({ token: res.body.refresh.token });
//     expect(dbRefreshTokenDoc).toMatchObject({ type: TokenType.REFRESH, user: userThree.id, blacklisted: false });
//     const dbRefreshTokenCount = await Token.countDocuments();
//     expect(dbRefreshTokenCount).toBe(1);
//   });
//   test('should return 400 error if refresh token is missing from request body', async () => {
//     await request(app).post('/v1/auth/refresh-tokens').send().expect(httpStatus.BAD_REQUEST);
//   });
//   test('should return 401 error if refresh token is signed using an invalid secret', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH, 'invalidSecret');
//     await tokenService.saveToken(refreshToken, userThree.id, expires, TokenType.REFRESH);
//     await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 error if refresh token is not found in the database', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH);
//     await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 error if refresh token is blacklisted', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH);
//     await tokenService.saveToken(refreshToken, userThree.id, expires, TokenType.REFRESH, true);
//     await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 error if refresh token is expired', async () => {
//     await insertUser(userThree);
//     const expires = moment().subtract(1, 'minutes');
//     const refreshToken = tokenService.generateToken(userThree.id, expires);
//     await tokenService.saveToken(refreshToken, userThree.id, expires, TokenType.REFRESH);
//     await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 error if user is not found', async () => {
//     const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH);
//     await tokenService.saveToken(refreshToken, userThree.id, expires, TokenType.REFRESH);
//     await request(app).post('/v1/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
//   });
// });
// describe('POST /v1/auth/reset-password', () => {
//   test('should return 204 and reset the password', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//     const resetPasswordToken = tokenService.generateToken(userThree.id, expires, TokenType.RESET_PASSWORD);
//     await tokenService.saveToken({ token: resetPasswordToken, userId: userThree.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD});
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'password2' })
//       .expect(httpStatus.NO_CONTENT);
//     const dbUser = await User.findById(userThree.id);
//     const isPasswordMatch = await bcrypt.compare('password2', dbUser.password);
//     expect(isPasswordMatch).toBe(true);
//     const dbResetPasswordTokenCount = await Token.countDocuments({ user: userThree.id, type: TokenType.RESET_PASSWORD });
//     expect(dbResetPasswordTokenCount).toBe(0);
//   });
//   test('should return 400 if reset password token is missing', async () => {
//     await insertUser(userThree);
//     await request(app).post('/v1/auth/reset-password').send({ password: 'password2' }).expect(httpStatus.BAD_REQUEST);
//   });
//   test('should return 401 if reset password token is blacklisted', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//     const resetPasswordToken = tokenService.generateToken(userThree.id, expires, TokenType.RESET_PASSWORD);
//     await tokenService.saveToken({ token: resetPasswordToken, userId: userThree.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD}, true);
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'password2' })
//       .expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 if reset password token is expired', async () => {
//     await insertUser(userThree);
//     const expires = moment().subtract(1, 'minutes');
//     const resetPasswordToken = tokenService.generateToken(userThree.id, expires, TokenType.RESET_PASSWORD);
//     await tokenService.saveToken({ token: resetPasswordToken, userId: userThree.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD});
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'password2' })
//       .expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 401 if user is not found', async () => {
//     const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//     const resetPasswordToken = tokenService.generateToken(userThree.id, expires, TokenType.RESET_PASSWORD);
//     await tokenService.saveToken({ token: resetPasswordToken, userId: userThree.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD});
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'password2' })
//       .expect(httpStatus.UNAUTHORIZED);
//   });
//   test('should return 400 if password is missing or invalid', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//     const resetPasswordToken = tokenService.generateToken(userThree.id, expires, TokenType.RESET_PASSWORD);
//     await tokenService.saveToken({ token: resetPasswordToken, userId: userThree.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD});
//     await request(app).post('/v1/auth/reset-password').query({ token: resetPasswordToken }).expect(httpStatus.BAD_REQUEST);
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'short1' })
//       .expect(httpStatus.BAD_REQUEST);
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: 'password' })
//       .expect(httpStatus.BAD_REQUEST);
//     await request(app)
//       .post('/v1/auth/reset-password')
//       .query({ token: resetPasswordToken })
//       .send({ password: '11111111' })
//       .expect(httpStatus.BAD_REQUEST);
//   });
// });
// describe('POST /v1/auth/send-verification-email', () => {
//   beforeEach(() => {
//     jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue();
//   });
//   test('should return 204 and send verification email to the user', async () => {
//     await insertUser(userThree);
//     const sendVerificationEmailSpy = jest.spyOn(emailService, 'sendVerificationEmail');
//     await request(app)
//       .post('/v1/auth/send-verification-email')
//       .set('Authorization', `Bearer ${userThreeAccessToken}`)
//       .expect(httpStatus.NO_CONTENT);
//     expect(sendVerificationEmailSpy).toHaveBeenCalledWith(userThree.email, expect.any(String));
//     const verifyEmailToken = sendVerificationEmailSpy.mock.calls[0][1];
//     const dbVerifyEmailToken = await Token.findOne({ token: verifyEmailToken, user: userThree.id });
//     expect(dbVerifyEmailToken).toBeDefined();
//   });
//   test('should return 401 error if access token is missing', async () => {
//     await insertUser(userThree);
//     await request(app).post('/v1/auth/send-verification-email').send().expect(httpStatus.UNAUTHORIZED);
//   });
// });

//   test('should call next with no errors if access token is valid', async () => {
//     await insertUser(userThree);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userThreeAccessToken}` } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith();
//     expect(req.user.id).toEqual(userThree.id);
//   });

//   test('should call next with unauthorized error if access token is not found in header', async () => {
//     await insertUser(userThree);
//     const req = httpMocks.createRequest();
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with unauthorized error if access token is not a valid jwt token', async () => {
//     await insertUser(userThree);
//     const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with unauthorized error if the token is not an access token', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//     const refreshToken = tokenService.generateToken(userThree.id, expires, TokenType.REFRESH);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${refreshToken}` } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
//     await insertUser(userThree);
//     const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//     const accessToken = tokenService.generateToken(userThree.id, expires, TokenType.ACCESS, 'invalidSecret');
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with unauthorized error if access token is expired', async () => {
//     await insertUser(userThree);
//     const expires = moment().subtract(1, 'minutes');
//     const accessToken = tokenService.generateToken(userThree.id, expires, TokenType.ACCESS);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with unauthorized error if user is not found', async () => {
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userThreeAccessToken}` } });
//     const next = jest.fn();

//     await auth()(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(
//       expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
//     );
//   });

//   test('should call next with forbidden error if user does not have required rights and userId is not in params', async () => {
//     await insertUser(userThree);
//     const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userThreeAccessToken}` } });
//     const next = jest.fn();

//     await auth('anyRight')(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith(expect.any(ApiError));
//     expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: httpStatus.FORBIDDEN, message: 'Forbidden' }));
//   });

//   test('should call next with no errors if user does not have required rights but userId is in params', async () => {
//     await insertUser(userThree);
//     const req = httpMocks.createRequest({
//       headers: { Authorization: `Bearer ${userThreeAccessToken}` },
//       params: { userId: userThree.id.toHexString() },
//     });
//     const next = jest.fn();

//     await auth('anyRight')(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith();
//   });

//   test('should call next with no errors if user has required rights', async () => {
//     await insertUsers([admin]);
//     const req = httpMocks.createRequest({
//       headers: { Authorization: `Bearer ${adminAccessToken}` },
//       params: { userId: userThree.id.toHexString() },
//     });
//     const next = jest.fn();

//     await auth(...roleRights.get('admin'))(req, httpMocks.createResponse(), next);

//     expect(next).toHaveBeenCalledWith();
//   });
// });
