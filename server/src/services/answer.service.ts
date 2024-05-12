import { AnswerDetailInput } from "models/mongodb/subdocuments/answerDetail.model";
import { answerRepository } from "../repositories";
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import answerDetailRepository from "repositories/answerDetail.repository";

const getAnswer = async (id: string) => {
    const answer = await answerRepository.getById(id);
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    return answer;
}

export default {
    getAnswer,
}