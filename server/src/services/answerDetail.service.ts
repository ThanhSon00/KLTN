import httpStatus from "http-status";
import { answerDetailRepository } from "../repositories";
import ApiError from "../utils/ApiError";

const updateContent = async (id: string, { content } : { content: string }) => {
    await getAnswerDetail(id);
    const answerDetail = await answerDetailRepository.update(id, { content })   
    return answerDetail;
}

const getAnswerDetail = async (id: string) => {
    const answerDetail = await answerDetailRepository.getById(id);
    if (!answerDetail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer detail not found');
    }
    return answerDetail;
}

export default {
    updateContent,
    getAnswerDetail,
}