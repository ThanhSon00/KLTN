import { AnswerInput } from "models/mongodb/documents/answer.model";
import { faker } from "@faker-js/faker";
import { userOne } from "./user.fixture";
import { answerRepository } from "../../src/repositories";
import { questionOne } from "./question.fixture";
import { AnswerDetailInput } from "models/mongodb/subdocuments/answerDetail.model";

const answerDetailOne: AnswerDetailInput = {
    author: userOne.id ? userOne.id : '', 
    content: faker.lorem.paragraph(), 
    id: faker.database.mongodbObjectId(),
}

export const answerOne: AnswerInput = {
    details: answerDetailOne, 
    id: faker.database.mongodbObjectId(), 
    questionId: questionOne.id ? questionOne.id : faker.database.mongodbObjectId(), 
}

export const insertAnswer = (answerBody: AnswerInput) => {
    return answerRepository.create(answerBody);
}
