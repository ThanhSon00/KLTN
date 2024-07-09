import { QueryOptions } from 'mongoose';
import { Answer, Question, User } from '../models/mongodb/documents'
import { AnswerDocument, AnswerInput, AnswerSearch, AnswerUpdate, IAnswer } from '../models/mongodb/documents/answer.model';
import { AnswerDetailDocument, IAnswerDetail } from 'models/mongodb/subdocuments/answerDetail.model';

const increaseUserAnswers = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    user.answers += 1;
    await user.save();
}

const addAnswerToQuestion = async (questionId: string, answers: IAnswer) => {
    const question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question not found');
    }
    question.answers.push(answers);
    question.answersCount += 1;
    await question.save();
}

const create = async (answerBody: AnswerInput): Promise<AnswerDocument> => {
    const answer = await Answer.create({ 
        ...answerBody, 
        _id: answerBody.id, 
        details: {
            ...answerBody.details, 
            _id: answerBody.details.id
        }
    });

    await addAnswerToQuestion(answerBody.questionId, answer)
    await increaseUserAnswers(answerBody.details.author);
    return answer;
}

const getList = async (answerBody: Partial<AnswerSearch>, queryOptions?: QueryOptions<IAnswer & { lean: true }>): Promise<AnswerDocument[]> => {
    return await Answer.find(answerBody, null, queryOptions);
}

const getById = async (id: string) => {
    return await Answer.findById(id);
}

const updateQuestionAnswer = async (questionId: string, answerId: string, answerBody: AnswerUpdate) => {
    const question = await Question.findById(questionId);
    if (!question) throw new Error('Question not found');

    const updateCommentIndex = question.answers.findIndex(answer => answer.id.toString() === answerId);
    if (updateCommentIndex !== -1) {
        const answer = question.answers[updateCommentIndex]
      
        answer.details.content = answerBody.details.content !== undefined ? answerBody.details.content : answer.details.content;
        answer.details.votes = answerBody.details.votes !== undefined ? answerBody.details.votes : answer.details.votes;

        if (typeof answerBody.details.isBestAnswer === 'boolean') {
            answer.details.isBestAnswer = answerBody.details.isBestAnswer; 
            await Question.markAnswered(questionId, answerBody.details.isBestAnswer);
        }
    } else throw Error('Comment not found');
    await question.save();
}

const updateAnswer = async (id: string, answerBody: AnswerUpdate) => {
    const answer = await Answer.findById(id);
    if (!answer) throw new Error('Answer not found');
    // Không nên dùng findOneAndUpdate hay findByIdAndUpdate vì chúng sẽ thay đổi id của subdocument
    
    answer.details.content = answerBody.details.content !== undefined ? answerBody.details.content : answer.details.content;
    answer.details.votes = answerBody.details.votes !== undefined ? answerBody.details.votes : answer.details.votes;

    if (typeof answerBody.details.isBestAnswer === 'boolean') {
        answer.details.isBestAnswer = answerBody.details.isBestAnswer;
    }
    await answer.save();
    return answer;
}


const update = async (id: string, answerBody: AnswerUpdate) => {
    const answer = await updateAnswer(id, answerBody);
    await updateQuestionAnswer(answer.questionId.toString(), id, answerBody);
    return answer;
}

export default {
    create,
    getList,
    getById,
    update
}