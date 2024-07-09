import Joi from 'joi';
import { objectId, password } from './custom.validation';
import { AnswerInput, AnswerUpdate, IAnswer } from '../models/mongodb/documents/answer.model';
import { AnswerDetailInput, AnswerDetailUpdate, IAnswerDetail } from '../models/mongodb/subdocuments/answerDetail.model';
import { SearchOptions } from '../services/question.service';
import { sortCategory } from '../services/answer.service';

export const createAnswer = {
  body: Joi.object<AnswerInput>()
    .keys({
        id: Joi.string().custom(objectId),
        questionId: Joi.string().required().custom(objectId),
        details: Joi.object<AnswerDetailInput>().keys({
            id: Joi.string().custom(objectId),
            author: Joi.string().required().custom(objectId),
            content: Joi.string().required(),
        })
    }),
};

export const getAnswers = {
    query: Joi.object<IAnswer & IAnswerDetail & SearchOptions>().keys({
        questionId: Joi.custom(objectId),
        author: Joi.string().custom(objectId),
        amount: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required(),
        sortDesc: Joi.string().valid(...Object.values(sortCategory)),
        page: Joi.number().integer().min(1).required(),
  
    })
}

export const updateContent = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        content: Joi.string().required(),
    })
}

export const createAnswerComment = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object<AnswerDetailInput>().keys({
        id: Joi.string().custom(objectId),
        content: Joi.string().required(),
        author: Joi.string().required().custom(objectId),
    })
}

export const updateAnswerComment = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
        commentId: Joi.required().custom(objectId),
    }),
    body: Joi.object<AnswerDetailUpdate>().keys({
        content: Joi.string(),
    })
}

export const getAnswersCount = {}

export const getAnswerComments = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
}

export const updateAnswer = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object<AnswerUpdate>().keys({
        details: {
            content: Joi.string(),
            isBestAnswer: Joi.boolean(),
        }
    }).xor('details.content', 'details.isBestAnswer')
}

export const getAnswer = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
}