import setupTestDB from "../utils/setupTestDB";
import { expect, describe, test, beforeEach, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { userOne, insertUser } from '../fixtures/user.fixture';
import { searchRepository } from '../../src/repositories';
import { insertQuestions, questionOne, questionThree, questionTwo } from '../fixtures/question.fixture';

setupTestDB();

describe('Search routes', () => {
    describe('POST /v1/searches/init', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestions([questionOne, questionTwo, questionThree]);
        })

        test('should return 201 and successfully initialize new search document if data is ok', async () => {
            await request(app)
               .post('/v1/searches/init')
               .send()
               .expect(httpStatus.CREATED);
            
            const searches = await searchRepository.getList({});
            expect(searches.length).toBe(3);
            expect(searches[0].toJSON()).toMatchObject(
                {
                    id: expect.anything(),
                    keywords: expect.anything(),
                    questionId: questionOne.id,
                    paragraph: expect.anything(),
                }
            );

            expect(searches[1].toJSON()).toMatchObject(
                {
                    id: expect.anything(),
                    keywords: expect.anything(),
                    questionId: questionTwo.id,
                    paragraph: expect.anything(),
                }
            );

            expect(searches[2].toJSON()).toMatchObject(
                {
                    id: expect.anything(),
                    keywords: expect.anything(),
                    questionId: questionThree.id,
                    paragraph: expect.anything(),
                }
            );
        })
    })
});