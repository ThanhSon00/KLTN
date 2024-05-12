import Joi from 'joi';
import { objectId, password } from './custom.validation';
import { AnswerInput } from '../models/mongodb/documents/answer.model';
import { AnswerDetailInput } from 'models/mongodb/subdocuments/answerDetail.model';

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
    query: Joi.object().keys({
        questionId: Joi.required().custom(objectId),
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

