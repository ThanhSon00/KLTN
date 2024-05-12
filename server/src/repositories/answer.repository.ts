import { AnswerDetailInput } from 'models/mongodb/subdocuments/answerDetail.model';
import { Answer, Question } from '../models/mongodb/documents'
import { AnswerDocument, AnswerInput, AnswerUpdate } from '../models/mongodb/documents/answer.model';

const create = async (answerBody: AnswerInput): Promise<AnswerDocument> => {
    const answer = await Answer.create({ 
        ...answerBody, 
        _id: answerBody.id, 
        details: {
            ...answerBody.details, 
            _id: answerBody.details.id
        }
    });

    const { details: answerDetails } = answer;
    const question = await Question.findById(answer.questionId.toString());
    if (!question) {
        throw new Error('Question not found');
    }
    question.comments.push(answerDetails);
    
    await question.save();
    return answer;
}

const getList = async (answerBody: Partial<AnswerInput>): Promise<AnswerDocument[]> => {
    return await Answer.find(answerBody);
}

const getById = async (id: string) => {
    return await Answer.findById(id);
}

export default {
    create,
    getList,
    getById,
}