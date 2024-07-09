import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import { faker } from "@faker-js/faker";
import setupTestDB from "../../utils/setupTestDB";
import { answerRepository, questionRepository } from '../../../src/repositories';
import { answerOne } from '../../fixtures/answer.fixture';
import { insertQuestion, questionOne } from '../../fixtures/question.fixture';
import { insertUser, matchUserOne, userOne } from '../../fixtures/user.fixture';
import { matchAnswerOne } from '../../integration/answer.test';
import { AnswerUpdate, IAnswer } from 'models/mongodb/documents/answer.model';
import { IAnswerDetail } from 'models/mongodb/subdocuments/answerDetail.model';

setupTestDB();

describe('Answer repository', () => {
    describe('Answer create', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
            await answerRepository.create(answerOne);
        })
        test('should add answer details data to answers array of its question document if answer was created', async () => {
            if (!questionOne.id) throw Error('Id not found');

            const dbQuestion = await questionRepository.getById(questionOne.id);
            expect(dbQuestion).toBeDefined()
            expect(dbQuestion?.toJSON()).toMatchObject({
                title: questionOne.title,
                details: questionOne.details,
                answers: [matchAnswerOne],
                views: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                id: questionOne.id
            });
        })
    })

    describe('Answer update', () => {
        let answerUpdate: AnswerUpdate;
        beforeEach(async () => {
            if (!answerOne.details.id) throw new Error('id is required');
            answerUpdate = { 
                details: {
                    content: faker.lorem.paragraphs(8),
                }
            }

            await insertUser(userOne);
            await insertQuestion(questionOne);
            await answerRepository.create(answerOne);
            await answerRepository.update(answerOne.id as string, answerUpdate);
        })
        test('should update both answer details in answer and question comment document if it has', async () => {
            if (!answerOne.id || !questionOne.id) throw new Error('id is required');

            const answer = (await answerRepository.getById(answerOne.id))?.toJSON();
            const question = (await questionRepository.getById(questionOne.id))?.toJSON();
            const updatedAnswerDetail: IAnswerDetail = {
                id: answerOne.details.id as string,
                content: answerUpdate.details.content as string,
                author: matchUserOne,
                votes: expect.anything() as unknown as number,
                createdAt: expect.anything() as unknown as Date,
                updatedAt: expect.anything() as unknown as Date,
                isBestAnswer: false,
            }

            const matchAnswer: IAnswer = {
                id: answerOne.id as string,
                questionId: questionOne.id as string,
                details: updatedAnswerDetail,
            }

            expect(answer).toMatchObject({
                id: answerOne.id,
                questionId: questionOne.id,
                details: updatedAnswerDetail,
            })

            expect(question).toMatchObject({
                author: matchUserOne,
                id: questionOne.id,
                views: expect.anything(),
                title: questionOne.title,
                details: questionOne.details,
                answers: [matchAnswer],
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
        })
    })
})