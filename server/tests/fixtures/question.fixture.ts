import { IQuestion, QuestionInput } from "../../src/models/mongodb/documents/question.model";
import { faker } from "@faker-js/faker";
import { matchUserOne, userOne } from "./user.fixture";
import { questionRepository } from "../../src/repositories";

export const questionOne: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraph(8),
    author: userOne.id as string,
}

export const questionTwo: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraphs(8),
    author: userOne.id as string,
}

export const questionThree: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraphs(8),
    author: userOne.id as string,
}

export const matchQuestionOne = {
    id: expect.anything(),
    title: questionOne.title as string,
    details: questionOne.details as string,
    author: matchUserOne,
    views: expect.anything(),
    answers: expect.anything(),
    answered: false,
    votes: 0,
    createdAt: expect.anything(),
    updatedAt: expect.anything(),
}

export const insertQuestions = async (questions: QuestionInput[]) => {
    for (const question of questions) {
        const questionDb = await insertQuestion(question);
    }
}

export const insertQuestion = async (questionBody: QuestionInput) => {
    return await questionRepository.create(questionBody);
}