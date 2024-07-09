import httpStatus from "http-status";
import { questionRepository, voteRepository } from "../repositories"
import ApiError from "../utils/ApiError";
import { Question } from "../models/mongodb/documents";

export enum sortCategory {
    answers = 'answersCount',
    votes = 'totalVotes',
    views = 'views',
    activities = 'updatedAt',
    newest = 'createdAt',
}

export interface SearchOptions {
    amount: number
    sortDesc?: string,
    page: number,
}
export const getQuestion = async (id: string, currentLoggedUserId?: string, increaseView = false) => {
    const question = await questionRepository.getById(id, currentLoggedUserId);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    if (increaseView){
        question.views += 1;
        await question.save();
    }
    return question;
}

export const getQuestions = async (searchOptions: SearchOptions) => {
    const queryOptions = {
        limit: searchOptions.amount as number,
        skip: (searchOptions.page - 1) * (searchOptions.amount as number),
    }

    if (searchOptions.sortDesc) {
        Object.assign(queryOptions, { sort: { [`${searchOptions.sortDesc}`]: -1 } })
    }
    const questions =  await questionRepository.getList({}, queryOptions);
    return questions;
}

export const countQuestions = async () => {
    const count = await Question.estimatedDocumentCount();
    return count;
}

export const getAnsweredPercentage = async () => {
    const count = await Question.getAnsweredPecentage();
    return count;
}