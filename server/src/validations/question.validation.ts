import Joi from 'joi';
import { objectId } from './custom.validation';
import { IQuestion, QuestionInput } from '../models/mongodb/documents/question.model';
import { SearchOptions, sortCategory } from '../services/question.service';
import { IAnswer } from 'models/mongodb/documents/answer.model';
import { IAnswerDetail } from 'models/mongodb/subdocuments/answerDetail.model';

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
  query: Joi.object<SearchOptions>().keys({
    amount: Joi.number()
      .integer()
      .min(1)
      .max(10)
      .required(),
    sortDesc: Joi.string().valid(...Object.values(sortCategory)),
    page: Joi.number().integer().min(1).required(),
  })
}

export const getQuestionAnswers = {
  query: Joi.object<IAnswerDetail>().keys({
    author: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  })
}

export const getQuestionsCount = {}
export const getAnsweredPercentage = {}