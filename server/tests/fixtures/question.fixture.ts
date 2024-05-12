import { QuestionInput } from "../../src/models/mongodb/documents/question.model";
import { faker } from "@faker-js/faker";
import { userOne } from "./user.fixture";
import { questionRepository } from "../../src/repositories";

export const questionOne: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraph(8),
    author: userOne.id,
}

export const questionTwo: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraphs(8),
    author: userOne.id,
}

export const questionThree: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraphs(8),
    author: userOne.id,
}

export const insertQuestions = async (questions: QuestionInput[]) => {
    for (const question of questions) {
        await insertQuestion(question);
    }
}

export const insertQuestion = async (questionBody: QuestionInput) => {
    return await questionRepository.create(questionBody);
}