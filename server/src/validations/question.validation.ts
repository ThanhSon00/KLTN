import Joi from 'joi';
import { objectId } from './custom.validation';
import { QuestionInput } from 'models/mongodb/documents/question.model';

export const createQuestion = {
  body: Joi.object().keys({
    id: Joi.string(),
    title: Joi.string().required(),
    details: Joi.string().required(),
    author: Joi.string().required().custom(objectId),
  }),
};

export const getQuestion = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
}

export const updateQuestion = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object<QuestionInput>().keys({
    title: Joi.string(),
    details: Joi.string(),
  })
}

export const getQuestions = {
  query: Joi.object().keys({
    amount: Joi.number()
      .integer()
      .min(1)
      .max(10)
      .required(),
  })
}