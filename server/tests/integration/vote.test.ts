import { expect, describe, beforeEach, test, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { userOne, insertUser, userFour, matchUserOne } from '../fixtures/user.fixture';
import { insertQuestion, questionOne } from '../fixtures/question.fixture';
import { VoteInput, VoteType } from '../../src/models/mongodb/documents/vote.model';
import { insertVote, voteOne } from '../fixtures/vote.fixture';
import { tokenService } from '../../src/services';
import { userRepository } from '../../src/repositories';
// import { userOneAccessToken, adminAccessToken } from '../fixtures/token.fixture';

setupTestDB();

describe('Vote routes', () => {
  
  describe('POST /v1/votes', () => {
    let newVote: VoteInput;
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      newVote = {
        questionId: questionOne.id,
        type: VoteType.upvote
      }
    });

    test('should return 200 and the vote object if data is ok', async () => {
      const { access } = await tokenService.generateAuthTokens(userOne.id as string);
      const userOneAccessToken = access.token;
      const res = await request(app)
        .post(`/v1/votes`)
        .set('Cookie', `access_token=${userOneAccessToken}`)
        .send(newVote)
        .expect(httpStatus.CREATED);
        

      expect(res.body).toEqual({
        id: expect.anything(),
        voter: userOne.id,
        questionId: newVote.questionId,
        type: newVote.type,
      });
    });

    test('should return 400 error if vote already exists with same user and content id', async () => {
      await insertVote(voteOne);
      const { access } = await tokenService.generateAuthTokens(userOne.id as string);
      const userOneAccessToken = access.token;
      await request(app)
        .post(`/v1/votes`)
        .set('Cookie', `access_token=${userOneAccessToken}`)
        .send({
          questionId: questionOne.id,
          type: VoteType.upvote
        })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('PATCH /v1/votes/:id', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertVote(voteOne);
    });
    test('should return 200 and the updated vote if data is ok', async () => {
      const { access } = await tokenService.generateAuthTokens(userOne.id as string);
      const userOneAccessToken = access.token;
      const res = await request(app)
       .patch(`/v1/votes/${voteOne.id}`)
       .set('Cookie', `access_token=${userOneAccessToken}`)
       .send({
          type: VoteType.downvote
        })
       .expect(httpStatus.OK);
      expect(res.body).toEqual({
        id: voteOne.id,
        voter: userOne.id,
        questionId: voteOne.questionId,
        type: VoteType.downvote,
      });
    });
  });

  describe('DELETE /v1/votes/:id', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertVote(voteOne);
    });
    test('should return 200 and the deleted vote if data is ok', async () => {
      const { access } = await tokenService.generateAuthTokens(userOne.id as string);
      const userOneAccessToken = access.token;
      const res = await request(app)
       .delete(`/v1/votes/${voteOne.id}`)
       .set('Cookie', `access_token=${userOneAccessToken}`)
       .send()
       .expect(httpStatus.OK);
      expect(res.body).toEqual({
        id: voteOne.id,
        voter: userOne.id,
        questionId: voteOne.questionId,
        type: voteOne.type,
      });
    });
  });

})
