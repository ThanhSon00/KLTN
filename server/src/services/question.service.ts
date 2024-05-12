import httpStatus from "http-status";
import { questionRepository } from "../repositories"
import ApiError from "../utils/ApiError";
import { Question } from "../models/mongodb/documents";

interface Query {
    amount: number
}
export const getQuestion = async (id: string) => {
    const question = await questionRepository.getById(id);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
}

// export const getQuestionWithAnswers = async (id) => {
//     const getQuestionWithAnswers = await questionRepository.getById(id).populate('author');
// }

export const getRandomQuestions = async (query?: Query) => {
    const totalQuestions = await Question.estimatedDocumentCount();
    return await questionRepository.getList({}, {
        limit: query?.amount,
        skip: Math.floor(Math.random() * totalQuestions)
    });
}