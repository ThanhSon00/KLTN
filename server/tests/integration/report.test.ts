import setupTestDB from "../utils/setupTestDB";
import { expect, describe, test, beforeEach, jest } from '@jest/globals';
// @ts-expect-error
import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { userOne, insertUser, userFour } from '../fixtures/user.fixture';
import { reportRepository, searchRepository } from '../../src/repositories';
import { insertQuestion, insertQuestions, questionOne, questionThree, questionTwo } from '../fixtures/question.fixture';
import { insertReport, matchReportTwo, matchReportOne, reportOne, reportTwo } from "../fixtures/report.fixture";

setupTestDB();

describe('Report routes', () => {
    describe('POST /v1/reports', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertQuestion(questionOne);
        });
        
        test('should return 201 and successfully create new report if data is ok', async () => {
            const res = await request(app)
               .post('/v1/reports')
               .send(reportOne)
               .expect(httpStatus.CREATED);
            expect(res.body).toEqual(matchReportOne);
            const dbReport = await reportRepository.getById(res.body.id);
            expect(dbReport?.toJSON()).toMatchObject(matchReportOne);
        })
    })

    describe('GET /v1/reports', () => {
        beforeEach(async () => {
            await insertUser(userOne);
            await insertUser(userFour);
            await insertQuestion(questionOne);
            await insertReport(reportOne);
            await insertReport(reportTwo);
        });

        test('should return 200 and successfully get all reports', async () => {
            const res = await request(app)
               .get('/v1/reports?limit=5&page=1&type=question&sortDesc=createdAt')
               .expect(httpStatus.OK);
            expect(res.body).toEqual([matchReportTwo, matchReportOne]);
        })
    })
})