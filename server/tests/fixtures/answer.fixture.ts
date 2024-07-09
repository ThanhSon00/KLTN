import { AnswerInput } from "models/mongodb/documents/answer.model";
import { faker } from "@faker-js/faker";
import { userFour, userOne } from "./user.fixture";
import { answerRepository } from "../../src/repositories";
import { questionOne, questionTwo } from "./question.fixture";
import { AnswerDetailInput } from "models/mongodb/subdocuments/answerDetail.model";

const answerDetailOne: AnswerDetailInput = {
    author: userOne.id as string, 
    content: faker.lorem.paragraph(), 
    id: faker.database.mongodbObjectId(),
}

export const answerOne: AnswerInput = {
    details: answerDetailOne, 
    id: faker.database.mongodbObjectId(), 
    questionId: questionOne.id as string, 
}

const answerDetailTwo: AnswerDetailInput = {
    author: userFour.id as string, 
    content: faker.lorem.paragraph(), 
    id: faker.database.mongodbObjectId(),
}

export const answerTwo: AnswerInput = {
    details: answerDetailTwo, 
    id: faker.database.mongodbObjectId(), 
    questionId: questionOne.id as string, 
}


export const insertAnswer = (answerBody: AnswerInput) => {
    return answerRepository.create(answerBody);
}
