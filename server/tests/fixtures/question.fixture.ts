import { QuestionInput } from "../../src/models/mongodb/question.model";
import { faker } from "@faker-js/faker";
import { userThree } from "./user.fixture";
import { questionRepository } from "../../src/repositories";

export const questionOne: QuestionInput = {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    authorId: userThree.id,
}

export const questionTwo: QuestionInput = {
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    authorId: faker.database.mongodbObjectId(),
}

export const insertQuestion = async (questionBody: QuestionInput) => {
    return await questionRepository.create(questionBody);
}