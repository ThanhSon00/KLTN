import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { userThree, insertUser, userFour } from '../fixtures/user.fixture';
import { faker }from '@faker-js/faker';
import { QuestionInput } from '../../src/models/mongodb/question.model';
import { questionRepository, userRepository } from '../../src/repositories';
import { insertQuestion, questionOne } from '../fixtures/question.fixture';
setupTestDB();

describe('Question routes', () => {
  
  describe('GET /v1/questions/:id', () => {
    beforeEach(async () => {
      await insertUser(userThree);
      await insertQuestion(questionOne);
    })
    test('should return 200 and the question object if data is ok', async () => {
      const res = await request(app)
        .get(`/v1/questions/${questionOne.id}`)
        // .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: questionOne.id,
        title: questionOne.title,
        details: questionOne.details,
        views: 0,
        authorId: questionOne.authorId,
      });
    });

    // test('should return 401 error if access token is missing', async () => {
    //   await insertUser(userThree);

    //   await request(app).get(`/v1/users/${userOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    // });

    // test('should return 403 error if user is trying to get another user', async () => {
    //   await insertUsers([userOne, userTwo]);

    //   await request(app)
    //     .get(`/v1/users/${userTwo._id}`)
    //     .set('Authorization', `Bearer ${userOneAccessToken}`)
    //     .send()
    //     .expect(httpStatus.FORBIDDEN);
    // });

    // test('should return 200 and the user object if admin is trying to get another user', async () => {
    //   await insertUsers([userOne, admin]);

    //   await request(app)
    //     .get(`/v1/users/${userOne._id}`)
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send()
    //     .expect(httpStatus.OK);
    // });

    test('should return 400 error if id is not a valid mongo id', async () => {

      await request(app)
        .get('/v1/users/invalidId')
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if question is not found', async () => {
      await request(app)
        .get(`/v1/users/${userFour.id}`)
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('POST /v1/questions', () => {
    beforeEach(async () => {
      await insertUser(userThree);
    });

    test('should return 201 and successfully create new question if data is ok', async () => {
      const res = await request(app)
        .post('/v1/questions')
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(questionOne)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        title: questionOne.title,
        details: questionOne.details,
        authorId: questionOne.authorId,
        views: 0, 
      });
      console.log(questionOne.id);
      console.log(res.body.id);
      const dbQuestion = await questionRepository.getById(res.body.id);
      console.log(dbQuestion);
      expect(dbQuestion).toBeDefined();
      expect(dbQuestion?.toJSON()).toMatchObject({
        id: expect.anything(),
        title: questionOne.title,
        details: questionOne.details,
        authorId: questionOne.authorId,
        views: 0,
      });
    });

    // test('should be able to create an admin as well', async () => {
    //   await insertUser(userThree);
    //   newUser.role = 'admin';

    //   const res = await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.CREATED);

    //   expect(res.body.role).toBe('admin');

    //   const dbUser = await User.findById(res.body.id);
    //   expect(dbUser.role).toBe('admin');
    // });

    // test('should return 401 error if access token is missing', async () => {
    //   await request(app).post('/v1/users').send(newUser).expect(httpStatus.UNAUTHORIZED);
    // });

    // test('should return 403 error if logged in user is not admin', async () => {
    //   await insertUser(userThree);

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${userOneAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.FORBIDDEN);
    // });

    // test('should return 400 error if email is invalid', async () => {
    //   await insertUser(userThree);
    //   newUser.email = 'invalidEmail';

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    // test('should return 400 error if email is already used', async () => {
    //   await insertUsers([admin, userOne]);
    //   newUser.email = userOne.email;

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    // test('should return 400 error if password length is less than 8 characters', async () => {
    //   await insertUser(userThree);
    //   newUser.password = 'passwo1';

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    // test('should return 400 error if password does not contain both letters and numbers', async () => {
    //   await insertUser(userThree);
    //   newUser.password = 'password';

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);

    //   newUser.password = '1111111';

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    // test('should return 400 error if role is neither user nor admin', async () => {
    //   await insertUser(userThree);
    //   newUser.role = 'invalid';

    //   await request(app)
    //     .post('/v1/users')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });
  });

  // describe('GET /v1/users', () => {
  //   test('should return 200 and apply the default query options', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(3);
  //     expect(res.body.results[0]).toEqual({
  //       id: userOne._id.toHexString(),
  //       name: userOne.name,
  //       email: userOne.email,
  //       role: userOne.role,
  //       isEmailVerified: userOne.isEmailVerified,
  //     });
  //   });

  //   test('should return 401 if access token is missing', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     await request(app).get('/v1/users').send().expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 403 if a non-admin is trying to access all users', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.FORBIDDEN);
  //   });

  //   test('should correctly apply filter on name field', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ name: userOne.name })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 1,
  //     });
  //     expect(res.body.results).toHaveLength(1);
  //     expect(res.body.results[0].id).toBe(userOne._id.toHexString());
  //   });

  //   test('should correctly apply filter on role field', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ role: 'user' })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 2,
  //     });
  //     expect(res.body.results).toHaveLength(2);
  //     expect(res.body.results[0].id).toBe(userOne._id.toHexString());
  //     expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
  //   });

  //   test('should correctly sort the returned array if descending sort param is specified', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ sortBy: 'role:desc' })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(3);
  //     expect(res.body.results[0].id).toBe(userOne._id.toHexString());
  //     expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
  //     expect(res.body.results[2].id).toBe(admin._id.toHexString());
  //   });

  //   test('should correctly sort the returned array if ascending sort param is specified', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ sortBy: 'role:asc' })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(3);
  //     expect(res.body.results[0].id).toBe(admin._id.toHexString());
  //     expect(res.body.results[1].id).toBe(userOne._id.toHexString());
  //     expect(res.body.results[2].id).toBe(userTwo._id.toHexString());
  //   });

  //   test('should correctly sort the returned array if multiple sorting criteria are specified', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ sortBy: 'role:desc,name:asc' })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(3);

  //     const expectedOrder = [userOne, userTwo, admin].sort((a, b) => {
  //       if (a.role < b.role) {
  //         return 1;
  //       }
  //       if (a.role > b.role) {
  //         return -1;
  //       }
  //       return a.name < b.name ? -1 : 1;
  //     });

  //     expectedOrder.forEach((user, index) => {
  //       expect(res.body.results[index].id).toBe(user._id.toHexString());
  //     });
  //   });

  //   test('should limit returned array if limit param is specified', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ limit: 2 })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 1,
  //       limit: 2,
  //       totalPages: 2,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(2);
  //     expect(res.body.results[0].id).toBe(userOne._id.toHexString());
  //     expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
  //   });

  //   test('should return the correct page if page and limit params are specified', async () => {
  //     await insertUsers([userOne, userTwo, admin]);

  //     const res = await request(app)
  //       .get('/v1/users')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .query({ page: 2, limit: 2 })
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).toEqual({
  //       results: expect.any(Array),
  //       page: 2,
  //       limit: 2,
  //       totalPages: 2,
  //       totalResults: 3,
  //     });
  //     expect(res.body.results).toHaveLength(1);
  //     expect(res.body.results[0].id).toBe(admin._id.toHexString());
  //   });
  // });

  // describe('DELETE /v1/users/:userId', () => {
  //   test('should return 204 if data is ok', async () => {
  //     await insertUser(userThree);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NO_CONTENT);

  //     const dbUser = await User.findById(userOne._id);
  //     expect(dbUser).toBeNull();
  //   });

  //   test('should return 401 error if access token is missing', async () => {
  //     await insertUser(userThree);

  //     await request(app).delete(`/v1/users/${userOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 403 error if user is trying to delete another user', async () => {
  //     await insertUsers([userOne, userTwo]);

  //     await request(app)
  //       .delete(`/v1/users/${userTwo._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.FORBIDDEN);
  //   });

  //   test('should return 204 if admin is trying to delete another user', async () => {
  //     await insertUsers([userOne, admin]);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NO_CONTENT);
  //   });

  //   test('should return 400 error if userId is not a valid mongo id', async () => {
  //     await insertUser(userThree);

  //     await request(app)
  //       .delete('/v1/users/invalidId')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 404 error if user already is not found', async () => {
  //     await insertUser(userThree);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NOT_FOUND);
  //   });
  // });

  // describe('PATCH /v1/users/:userId', () => {
  //   test('should return 200 and successfully update user if data is ok', async () => {
  //     await insertUser(userThree);
  //     const updateBody = {
  //       name: faker.name.findName(),
  //       email: faker.internet.email().toLowerCase(),
  //       password: 'newPassword1',
  //     };

  //     const res = await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.OK);

  //     expect(res.body).not.toHaveProperty('password');
  //     expect(res.body).toEqual({
  //       id: userOne._id.toHexString(),
  //       name: updateBody.name,
  //       email: updateBody.email,
  //       role: 'user',
  //       isEmailVerified: false,
  //     });

  //     const dbUser = await User.findById(userOne._id);
  //     expect(dbUser).toBeDefined();
  //     expect(dbUser.password).not.toBe(updateBody.password);
  //     expect(dbUser).toMatchObject({ name: updateBody.name, email: updateBody.email, role: 'user' });
  //   });

  //   test('should return 401 error if access token is missing', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { name: faker.name.findName() };

  //     await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 403 if user is updating another user', async () => {
  //     await insertUsers([userOne, userTwo]);
  //     const updateBody = { name: faker.name.findName() };

  //     await request(app)
  //       .patch(`/v1/users/${userTwo._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.FORBIDDEN);
  //   });

  //   test('should return 200 and successfully update user if admin is updating another user', async () => {
  //     await insertUsers([userOne, admin]);
  //     const updateBody = { name: faker.name.findName() };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.OK);
  //   });

  //   test('should return 404 if admin is updating another user that is not found', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { name: faker.name.findName() };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.NOT_FOUND);
  //   });

  //   test('should return 400 error if userId is not a valid mongo id', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { name: faker.name.findName() };

  //     await request(app)
  //       .patch(`/v1/users/invalidId`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 400 if email is invalid', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { email: 'invalidEmail' };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 400 if email is already taken', async () => {
  //     await insertUsers([userOne, userTwo]);
  //     const updateBody = { email: userTwo.email };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should not return 400 if email is my email', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { email: userOne.email };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.OK);
  //   });

  //   test('should return 400 if password length is less than 8 characters', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { password: 'passwo1' };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 400 if password does not contain both letters and numbers', async () => {
  //     await insertUser(userThree);
  //     const updateBody = { password: 'password' };

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);

  //     updateBody.password = '11111111';

  //     await request(app)
  //       .patch(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send(updateBody)
  //       .expect(httpStatus.BAD_REQUEST);
  //   });
  // });
});