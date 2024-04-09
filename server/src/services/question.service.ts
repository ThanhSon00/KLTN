import httpStatus from "http-status";
import { questionRepository } from "../repositories"
import ApiError from "../utils/ApiError";

export const getQuestion = async (id: string) => {
    const question = await questionRepository.getById(id);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
}
