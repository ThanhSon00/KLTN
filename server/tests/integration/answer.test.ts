import setupTestDB from "../utils/setupTestDB";
import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { userOne, insertUser, userFour, matchUserOne } from '../fixtures/user.fixture';
import { answerRepository, questionRepository, userRepository } from '../../src/repositories';
import { insertQuestion, questionOne } from '../fixtures/question.fixture';
import { answerOne, insertAnswer } from "../fixtures/answer.fixture";
import { AnswerDetailInput, AnswerDetailUpdate } from "models/mongodb/subdocuments/answerDetail.model";
import { faker } from "@faker-js/faker";

setupTestDB();

describe('Answer routes', () => {
    describe('POST /v1/answers', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
        })
        const matchAuthor = {
            name: userOne.name,
            email: userOne.email,
            avatar: expect.anything(),
            isEmailVerified: expect.anything(),
            id: userOne.id,
        };
        const matchAnswer = {
            id: answerOne.id,
            details: { 
                author: matchAuthor, 
                id: answerOne.details.id,
                content: answerOne.details.content, 
                voteCount: 0, 
                updatedAt: expect.anything(), 
                createdAt: expect.anything() 
            },
            questionId: answerOne.questionId,
        };
        
        test('should return 201 and successfully create new question if data is ok', async () => {
            const res = await request(app)
               .post('/v1/answers')
               .send(answerOne)
               .expect(httpStatus.CREATED);
            expect(res.body).toEqual(matchAnswer);

            const dbAnswer = await answerRepository.getById(res.body.id);
            expect(dbAnswer).toBeDefined();
            expect(dbAnswer?.toJSON()).toMatchObject(matchAnswer)
        })
    })


    describe('PATCH /v1/answers/details/:id', () => {
        let updateData: AnswerDetailUpdate = {
            content: '',
        }

        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
            await insertAnswer(answerOne);

            updateData = {
                content: faker.lorem.paragraphs()
            }
            
        })
        test('should return 200 if data is updated successfully', async () => {
            const res = await request(app)
                .patch(`/v1/answers/details/${answerOne.details.id}`)
                .send(updateData)
                .expect(httpStatus.OK);
            
            expect(res.body).toEqual({
                author: matchUserOne,
                content: updateData.content,
                voteCount: 0,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                id: answerOne.details.id,
            })
        })
    })
});