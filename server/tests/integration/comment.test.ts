import { expect, describe, beforeEach, test, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { insertAnswer, answerOne } from '../fixtures/answer.fixture';
import { insertQuestion, questionOne } from '../fixtures/question.fixture';
import { insertUser, matchUserOne, userFour, userOne } from '../fixtures/user.fixture';
import { commentOne, commentTwo, insertComment, matchCommentOne, matchCommentTwo } from '../fixtures/comment.fixture';
import { Comment } from '../../src/models/mongodb/documents/comment.model';
import { faker } from '@faker-js/faker';

setupTestDB();

describe('Comment routes', () => {
  describe('POST /v1/answer/:id/comments', () => {
    let newComment: { content: string, author: string };
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      newComment = { content: faker.lorem.sentence(), author: userOne.id as string}
    })
  
    test('should return 201 and the comment object if data is ok', async () => {
      const res = await request(app)
       .post(`/v1/answers/${answerOne.id}/comments`)
       .send(newComment)
       .expect(httpStatus.CREATED);
      expect(res.body).toEqual({
        id: expect.anything(),
        answerId: answerOne.id,
        details: {
          id: expect.anything(),
          author: matchUserOne,
          content: newComment.content,
          votes: 0,
          isBestAnswer: false,
          createdAt: expect.anything(),
          updatedAt: expect.anything()
        },
      });
    })
  });

  describe('PATCH /v1/answer/:id/comments/:commentId', () => {
    let newContent: string;
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      await insertComment(commentOne);
      newContent = faker.lorem.sentence();
    })
  
    test('should return 200 and the updated comment object if data is ok', async () => {
      const res = await request(app)
        .patch(`/v1/answers/${answerOne.id}/comments/${commentOne.id}`)
        .send({ content: newContent })
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        id: expect.anything(),
        answerId: answerOne.id,
        details: {
          id: expect.anything(),
          author: matchUserOne,
          content: newContent,
          votes: 0,
          isBestAnswer: false,
          createdAt: expect.anything(),
          updatedAt: expect.anything()
        },
      });
    })
  });
  
  describe('GET /v1/answer/:id/comments', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertUser(userFour);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      await insertComment(commentOne);
      await insertComment(commentTwo);
    })

    test('should return 200 and the comment object if data is ok', async () => {
      const res = await request(app)
       .get(`/v1/answers/${answerOne.id}/comments`)
       .send()
       .expect(httpStatus.OK);
      expect(res.body).toEqual([
        matchCommentOne,
        matchCommentTwo
      ])
    })
  });
})