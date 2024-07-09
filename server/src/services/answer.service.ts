import { answerRepository } from "../repositories";
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { Answer, AnswerInput, AnswerSearch, AnswerUpdate, IAnswer } from "../models/mongodb/documents/answer.model";
import { removeFalsyProperties } from "../utils/removeFalsyProperties";
import { notificationService } from "../services";

export interface SearchOptions {
    amount: number
    sortDesc?: string,
    page: number,
}

export enum sortCategory {
    votes = 'votes',
    latest = 'createdAt',
}

const getAnswerById = async (id: string) => {
    const answer = await answerRepository.getById(id);
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    return answer;
}

const createAnswer = async (answerInput: AnswerInput) => {
    const userAlreadyAnswered = await Answer.checkIfAnswerExists(answerInput.questionId, answerInput.details.author); 
    if (userAlreadyAnswered) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User already answered this question');        
    }
    const answer = await answerRepository.create(answerInput);
    // Send notification to user who ask question
    await notificationService.notifyUserNewAnswer(answer);
    return answer;
}

const getAnswersCount = async () => {
    const count = await Answer.estimatedDocumentCount();
    return count;
}

const getAnswers = async (filterOptions: Partial<AnswerSearch>, queryOptions: SearchOptions) => {
    const answers = await answerRepository.getList(removeFalsyProperties(filterOptions), {
        limit: queryOptions.amount,
        skip: (queryOptions.page - 1) * queryOptions.amount,
        sort: { [`${queryOptions.sortDesc}`]: -1 },
    });
    return answers;
}

const updateById = async (id: string, answerUpdate: AnswerUpdate) => {
    const answer = await answerRepository.update(id, answerUpdate);

    if (typeof answerUpdate.details.isBestAnswer === 'boolean') {
        await notificationService.notifyUserBestAnswer(answer);
    }
    return answer;
}

export default {
    getAnswer: getAnswerById,
    createAnswer,
    getAnswers,
    getAnswersCount,
    updateById,
}