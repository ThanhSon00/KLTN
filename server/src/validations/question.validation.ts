import Joi from 'joi';
import { objectId } from './custom.validation';

export const createQuestion = {
  body: Joi.object().keys({
    id: Joi.string(),
    title: Joi.string().required(),
    details: Joi.string().required(),
    authorId: Joi.string().required().custom(objectId),
  }),
};

export const getQuestion = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
}
