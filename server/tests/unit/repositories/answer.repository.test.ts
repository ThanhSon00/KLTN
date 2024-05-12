import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import { faker } from "@faker-js/faker";
import setupTestDB from "../../utils/setupTestDB";
import { answerRepository, questionRepository } from '../../../src/repositories';
import { answerOne } from '../../fixtures/answer.fixture';
import { insertQuestion, questionOne } from '../../fixtures/question.fixture';
import { insertUser, userOne } from '../../fixtures/user.fixture';

setupTestDB();

describe('Answer repository', () => {
    describe('Answer create', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
            await answerRepository.create(answerOne);
        })
        test('should add answer details data to comment array of its question document if answer was created', async () => {
            if (!questionOne.id) throw Error('Id not found');

            const dbQuestion = await questionRepository.getById(questionOne.id);
            expect(dbQuestion).toBeDefined()
            expect(dbQuestion?.toJSON()).toMatchObject({
                title: questionOne.title,
                details: questionOne.details,
                views: expect.anything(),
                comments: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                id: questionOne.id
            });
        })
    })
})