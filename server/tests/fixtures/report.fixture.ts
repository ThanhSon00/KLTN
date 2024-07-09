import { faker } from "@faker-js/faker";
import { VoteInput, VoteType } from "../../src/models/mongodb/documents/vote.model";
import { matchUserFour, matchUserOne, userFour, userOne } from "./user.fixture";
import { questionOne } from "./question.fixture";
import { reportRepository, voteRepository } from "../../src/repositories";
import { IReport, ReportInput, ReportStatus, ReportType } from "../../src/models/mongodb/documents/report.model";
import { reportService } from "../../src/services";

export const reportOne: Partial<ReportInput> = {
    id: faker.database.mongodbObjectId().toString(),
    reporter: userOne.id as string,
    details: faker.lorem.sentence(),
    questionId: questionOne.id as string,
    type: ReportType.question
}

export const matchReportOne: IReport = {
    id: reportOne.id as string,
    reporter: matchUserOne,
    details: reportOne.details as string,
    questionId: reportOne.questionId as string,
    type: reportOne.type as ReportType,
    highlightLink: `/home/questions/${questionOne.id}/highlight`,
    title: questionOne.title as string,
    status: ReportStatus.pending,
    createdAt: expect.anything(),
    updatedAt: expect.anything(),
}

export const reportTwo: Partial<ReportInput> = {
    id: faker.database.mongodbObjectId().toString(),
    reporter: userFour.id as string,
    details: faker.lorem.sentence(),
    questionId: questionOne.id as string,
    type: ReportType.question
}

export const matchReportTwo: IReport = {
    id: reportTwo.id as string,
    reporter: matchUserFour,
    details: reportTwo.details as string,
    questionId: reportTwo.questionId as string,
    type: reportTwo.type as ReportType,
    highlightLink: `/home/questions/${questionOne.id}/highlight`,
    title: questionOne.title as string,
    status: ReportStatus.pending,
    createdAt: expect.anything(),
    updatedAt: expect.anything(),
}
export const insertReport = async (report: ReportInput) => {
    await reportService.createReport(report);
}