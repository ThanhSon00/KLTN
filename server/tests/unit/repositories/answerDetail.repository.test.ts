import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import { faker } from "@faker-js/faker";
import setupTestDB from "../../utils/setupTestDB";
import { answerDetailRepository, answerRepository, questionRepository } from '../../../src/repositories';
import { answerOne } from '../../fixtures/answer.fixture';
import { insertQuestion, questionOne } from '../../fixtures/question.fixture';
import { insertUser, matchUserOne, userOne } from '../../fixtures/user.fixture';
import { AnswerDetailInput, AnswerDetailUpdate } from 'models/mongodb/subdocuments/answerDetail.model';

setupTestDB();

describe('AnswerDetail repository', () => {
    describe('AnswerDetail update', () => {
        let newAnswerDetails: AnswerDetailUpdate;
        beforeEach(async () => {
            if (!answerOne.details.id) throw new Error('id is required');
            newAnswerDetails = {
                content: faker.lorem.paragraphs(8),
            };

            await insertUser(userOne);
            await insertQuestion(questionOne);
            await answerRepository.create(answerOne);
            await answerDetailRepository.update(answerOne.details.id, newAnswerDetails);
        })
        test('should update both answer details in answer and question comment document if it has', async () => {
            if (!answerOne.id || !questionOne.id) throw new Error('id is required');

            const answer = (await answerRepository.getById(answerOne.id))?.toJSON();
            const question = (await questionRepository.getById(questionOne.id))?.toJSON();
            const updatedAnswerDetail = {
                id: answerOne.details.id,
                content: newAnswerDetails.content,
                author: matchUserOne,
                voteCount: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
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
                comments: [updatedAnswerDetail],
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
        })
    })
})