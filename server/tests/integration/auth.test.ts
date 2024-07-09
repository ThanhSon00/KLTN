import { expect, describe, beforeEach, test, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
// @ts-expect-error
import faker from 'faker';
import httpStatus from 'http-status';
import moment from 'moment';
import app from '../../src/app';
import config from '../../src/config/config';
import { tokenService, emailService } from '../../src/services';
import setupTestDB from '../utils/setupTestDB';
import { TokenTypes } from '../../src/config/tokens';
import { userOne, insertUser, matchUserOne } from '../fixtures/user.fixture';
import { tokenRepository, userRepository } from '../../src/repositories';
import { IUser, UserInput } from 'models/mongodb/documents/user.model';
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
      const expectedUser = {
        id: expect.any(String),
        name: newUser.name,
        email: newUser.email,
        avatar: '',
        isEmailVerified: false,
        answers: 0,
        city: "",
        description: "",
        gender: "",
        phoneNumber: "",
        points: 0,
        questions: 0,
        views: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        isBanned: false,
        role: 'user',
      };
      const sendVerificationEmailSpy = jest.spyOn(emailService, 'sendVerificationEmail');
      const res = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);
      const user = res.body;
      expect(sendVerificationEmailSpy).toHaveBeenCalledWith(newUser.email, expect.any(String));

      const verifyEmailToken = sendVerificationEmailSpy.mock.calls[0][1];
      const dbVerifyEmailToken = await tokenRepository.getList({ token: verifyEmailToken, userId: user.id });
      expect(dbVerifyEmailToken[0]).toBeDefined();

      expect(user).toEqual(expectedUser);

      const dbUser = await userRepository.getById(user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser.toJSON()).toEqual(expectedUser);

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
      expect(res.body).toEqual(matchUserOne);

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
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.REFRESH);
      const { id } = await tokenService.saveToken({
        token: refreshToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.REFRESH,
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
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.REFRESH);
      await request(app)
        .post('/v1/auth/logout')
        .set('Cookie', [`refresh_token=${refreshToken}`])
        .expect(httpStatus.NOT_FOUND);
    });
    test('should return 404 error if refresh token is blacklisted', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.REFRESH);
      await tokenService.saveToken({
        token: refreshToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.REFRESH,
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
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.RESET_PASSWORD);
      const tokenData = await tokenService.saveToken({
        token: resetPasswordToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.RESET_PASSWORD,
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
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.RESET_PASSWORD);
      await request(app).post(`/v1/auth/new-password`).send({ token: resetPasswordToken }).expect(httpStatus.UNAUTHORIZED);
    });
    test('should return 401 if token is not found', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.RESET_PASSWORD);
      const tokenData = await tokenService.saveToken({
        token: resetPasswordToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.RESET_PASSWORD,
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
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.VERIFY_EMAIL);
      const dbTokenData = await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.VERIFY_EMAIL,
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
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.VERIFY_EMAIL);
      await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.VERIFY_EMAIL,
        blacklisted: true,
      });
      await request(app).post('/v1/auth/verify-email').send({ token: verifyEmailToken }).expect(httpStatus.UNAUTHORIZED);
    });
    test('should return 401 if verify email token is expired', async () => {
      if (!userOne.id) throw Error();

      await insertUser(userOne);
      const expires = moment().subtract(1, 'minutes');
      const verifyEmailToken = tokenService.generateToken(userOne.id.toString(), expires, TokenTypes.VERIFY_EMAIL);
      await tokenService.saveToken({
        token: verifyEmailToken,
        userId: userOne.id,
        expires: expires.toDate(),
        type: TokenTypes.VERIFY_EMAIL,
      });
      await request(app).post('/v1/auth/verify-email').send({ token: verifyEmailToken }).expect(httpStatus.UNAUTHORIZED);
    });
  });
});