import { expect, describe, beforeEach, test, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { userOne, insertUser, userFour, matchUserOne } from '../fixtures/user.fixture';
import { notificationRepository } from '../../src/repositories';
import { NotiType } from '../../src/models/mongodb/documents/notification.model';
import { faker } from '@faker-js/faker';
// import { userOneAccessToken, adminAccessToken } from '../fixtures/token.fixture';

setupTestDB();

describe('User routes', () => {
  
  describe('GET /v1/users/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await insertUser(userOne);
      const res = await request(app)
        .get(`/v1/users/${userOne.id}`)
        // .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toEqual(matchUserOne);
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUser(userOne);

      await request(app)
        .get('/v1/users/invalidId')
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await insertUser(userOne);

      await request(app)
        .get(`/v1/users/${userFour.id}`)
        // .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('GET /v1/users/:id/notifications', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await notificationRepository.create({
        details: faker.lorem.sentence(),
        type: NotiType.newAnswer,
        receiver: userOne.id as string,
      })
    });

    test('should return 200 and the user object if data is ok', async () => {
      const res = await request(app)
       .get(`/v1/users/${userOne.id}/notifications?limit=5&page=1`)
        //.set('Authorization', `Bearer ${adminAccessToken}`)
       .send()
       .expect(httpStatus.OK);

      expect(res.body).toEqual([{
        id: expect.any(String),
        details: expect.any(String),
        type: NotiType.newAnswer,
        receiver: userOne.id,
        unread: true,
        isSeen: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }]);
    })
  })
});
