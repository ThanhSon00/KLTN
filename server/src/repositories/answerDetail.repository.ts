import { Question, Answer } from "../models/mongodb/documents";
import { AnswerDetailUpdate } from "../models/mongodb/subdocuments/answerDetail.model";

const update = async (id: string, answerDetailBody: AnswerDetailUpdate) => {
    const answer = await Answer.findOne({ 'details._id': id });
    if (!answer) throw new Error('Answer not found');

    const question = await Question.findById(answer.questionId);
    if (!question) throw new Error('Question not found');

    answer.details.content = answerDetailBody.content;
    const updatedAnswer = await answer.save();

    const updateCommentIndex = question.comments.findIndex(comment => comment.id.toString() === id);
    if (updateCommentIndex !== -1) {
        question.comments[updateCommentIndex].content = answerDetailBody.content;
    } else throw Error('Comment not found');

    await question.save();
    return updatedAnswer.details;
}

const getById = async (id: string) => {
    const answer = await Answer.findOne({ 'details._id': id });
    return answer?.details;
}

export default {
    update,
    getById
}