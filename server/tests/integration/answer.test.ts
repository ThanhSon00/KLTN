import setupTestDB from "../utils/setupTestDB";
import { expect, describe, test, beforeEach, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { userOne, insertUser, userFour, matchUserOne, matchUserFour } from '../fixtures/user.fixture';
import { answerRepository, questionRepository, userRepository } from '../../src/repositories';
import { insertQuestion, questionOne } from '../fixtures/question.fixture';
import { answerOne, answerTwo, insertAnswer } from "../fixtures/answer.fixture";
import { AnswerDetailInput, AnswerDetailUpdate, IAnswerDetail } from "../../src/models/mongodb/subdocuments/answerDetail.model";
import { faker } from "@faker-js/faker";
import { AnswerUpdate, IAnswer } from "../../src/models/mongodb/documents/answer.model";

setupTestDB();

export const matchAnswerOne: IAnswer = {
    id: answerOne.id as string,
    details: {
        author: matchUserOne,
        id: answerOne.details.id as string,
        content: answerOne.details.content as string,
        votes: 0,
        createdAt: expect.anything() as unknown as Date,
        updatedAt: expect.anything() as unknown as Date,
        isBestAnswer: false,
    },
    questionId: answerOne.questionId,
    comments: [],
    // @ts-expect-error
    commentsAmount: expect.any(Number),
};

export const matchAnswerTwo: IAnswer = {
    id: answerTwo.id as string,
    details: {
        author: matchUserFour,
        id: answerTwo.details.id as string,
        content: answerTwo.details.content as string,
        votes: 0,
        createdAt: expect.anything() as unknown as Date,
        updatedAt: expect.anything() as unknown as Date,
        isBestAnswer: false,
    },
    questionId: answerTwo.questionId,
    comments: [],
    commentsAmount: 0
};

export const matchAnswerDetailOne: IAnswerDetail = {
    id: answerOne.details.id as string,
    content: answerOne.details.content as string,
    author: matchUserOne,
    votes: 0,
    createdAt: expect.anything() as unknown as Date,
    updatedAt: expect.anything() as unknown as Date,
    isBestAnswer: false,
}

describe('Answer routes', () => {
    describe('POST /v1/answers', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
        })
        
        test('should return 201 and successfully create new question if data is ok', async () => {
            const res = await request(app)
               .post('/v1/answers')
               .send(answerOne)
               .expect(httpStatus.CREATED);
            expect(res.body).toEqual(matchAnswerOne);

            const dbAnswer = await answerRepository.getById(res.body.id);
            expect(dbAnswer).toBeDefined();
            expect(dbAnswer?.toJSON()).toMatchObject(matchAnswerOne)
        })
    })

    describe('GET /v1/answers', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertUser(userFour);
            await insertQuestion(questionOne);
            await insertAnswer(answerOne);
            await insertAnswer(answerTwo);
        })

        test('should return 200 and successfully get all answers', async () => {
            const res = await request(app)
               .get('/v1/answers?page=1&amount=5&sortDesc=votes')
               .expect(httpStatus.OK);
            expect(res.body).toEqual([matchAnswerOne, matchAnswerTwo, { hasMore: expect.any(Boolean) }]);
        })
    })

    describe('GET /v1/answers/count', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertUser(userFour);
            await insertQuestion(questionOne);
            await insertAnswer(answerOne);
            await insertAnswer(answerTwo);
        })

        test('should return 200 and total of answers', async () => {
            const res = await request(app)
                .get('/v1/answers/count')
                .send()
                .expect(httpStatus.OK);
            expect(res.body).toEqual(2);
        })
    })

    describe('PATCH /v1/answers/:id', () => {
        let updateData: AnswerUpdate = {
            details: {
                content: '',
            }
        }

        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
            await insertAnswer(answerOne);

            updateData.details = {
                content: faker.lorem.paragraphs()
            }
            
        })
        test('should return 200 if data is updated successfully', async () => {
            const res = await request(app)
                .patch(`/v1/answers/${answerOne.id}`)
                .send(updateData)
                .expect(httpStatus.OK);
            
            expect(res.body).toEqual({
                ...matchAnswerOne,
                details: {
                   ...matchAnswerOne.details,
                    content: updateData.details.content
                }
            })
        })
    })

    describe('GET /v1/answers/:id', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
            await insertAnswer(answerOne);
        })

        test('should return 200 and specific answer detail', async () => {
            const res = await request(app)
                .get(`/v1/answers/${answerOne.id}`)
                .send()
                .expect(httpStatus.OK);
            expect(res.body).toEqual(matchAnswerOne)
        })
    })
});