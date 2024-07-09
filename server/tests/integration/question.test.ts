import { expect, describe, test, beforeEach, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { userOne, insertUser, userFour, matchUserOne } from '../fixtures/user.fixture';
import { questionRepository, userRepository } from '../../src/repositories';
import { insertQuestion, insertQuestions, questionOne, questionThree, questionTwo } from '../fixtures/question.fixture';
import { faker } from '@faker-js/faker';
import { title } from 'process';
import { answerOne, answerTwo, insertAnswer } from '../fixtures/answer.fixture';
import { matchAnswerOne, matchAnswerTwo } from './answer.test';
import { userOneAccessToken } from '../fixtures/token.fixture';
import { insertVote, matchVoteOne, voteOne } from '../fixtures/vote.fixture';

setupTestDB();

describe('Question routes', () => {
  
  describe('GET /v1/questions/:id', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
    })


    test('should return 200 and the question object if data is ok and user not logged in', async () => {
      const res = await request(app)
        .get(`/v1/questions/${questionOne.id}`)
        // .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: questionOne.id,
        title: questionOne.title,
        details: questionOne.details,
        views: expect.anything(),
        author: matchUserOne,
        answers: [],
        answered: false,
        votes: 0,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });
    });

    test('should return 200 and the question object with vote status if user logged in', async () => {
      await insertVote({ ...voteOne, voter: userOne.id });
      const res = await request(app)
        .get(`/v1/questions/${questionOne.id}`)
        .set('Cookie', `access_token=${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: questionOne.id,
        title: questionOne.title,
        details: questionOne.details,
        views: expect.anything(),
        author: matchUserOne,
        answers: [],
        answered: false,
        votes: 1,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        voteStatus: matchVoteOne,
      });
    });

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
      await insertUser(userOne);
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
        author: matchUserOne,
        views: expect.anything(),
        answers: [],
        answered: false,
        votes: 0,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbQuestion = await questionRepository.getById(res.body.id);
      expect(dbQuestion).toBeDefined();
      expect(dbQuestion?.toJSON()).toMatchObject({
        id: expect.anything(),
        title: questionOne.title,
        details: questionOne.details,
        author: matchUserOne,
        views: expect.anything(),
        votes: 0,
        answers: [],
        answered: false,
      });
    });
  });

  describe('PATCH /v1/questions/:id', () => {
    let updateData = {
      title: '',
      details: ''
    }

    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);

      updateData = {
        title: faker.lorem.sentence(),
        details: faker.lorem.sentence(),
      }
    });

    test('should return 200 if data is updated successfully', async () => {
      const matchQuestion = {
        title: updateData.title,
        details: updateData.details,
        author: matchUserOne,
        views: expect.anything(),
        answers: [],
        answered: false,
        votes: 0,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        id: questionOne.id
      }
    
      const res = await request(app)
      .patch(`/v1/questions/${questionOne.id}`)
      .send(updateData)
      .expect(httpStatus.OK);

      expect(res.body).toEqual(matchQuestion)

      const dbQuestion = await questionRepository.getById(res.body.id);
      expect(dbQuestion).toBeDefined();
      expect(dbQuestion?.toJSON()).toMatchObject(matchQuestion);
    });
  })

  describe('GET /v1/questions', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
    })

    test('should return 200 and the questions if data is ok', async () => {
      const res = await request(app)
       .get('/v1/questions?amount=1&page=1')
        //.set('Authorization', `Bearer ${adminAccessToken}`)
       .send()
       .expect(httpStatus.OK);

      expect(res.body).toEqual([
        {
          id: questionOne.id,
          title: questionOne.title,
          details: questionOne.details,
          views: expect.anything(),
          author: matchUserOne,
          answers: [],
          answered: false,
          votes: 0,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
        {
          hasMore: false,
        }
      ]);
    });
  })

  describe('GET /v1/questions/count', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestions([questionOne, questionTwo, questionThree])
    })

    test('should return 200 and total of questions', async () => {
      const res = await request(app)
       .get('/v1/questions/count')
        //.set('Authorization', `Bearer ${adminAccessToken}`)
       .send()
       .expect(httpStatus.OK);

      expect(res.body).toEqual(3);
    })
  })

  describe('GET /v1/questions/answered-percentage', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertUser(userFour);
      await insertQuestions([questionOne, questionTwo, questionThree])
      await insertAnswer(answerOne);
      await insertAnswer(answerTwo);
    })

    test('should return 200 and ratio of answered questions', async () => {
      const res = await request(app)
        .get('/v1/questions/answered-percentage')
        .send()
        .expect(httpStatus.OK);
        
      expect(res.body).toEqual(Math.round((1/3) * 100));
    })
  })
});
