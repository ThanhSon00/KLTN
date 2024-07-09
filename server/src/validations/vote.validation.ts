import Joi from 'joi';
import { IVote, VoteType } from '../models/mongodb/documents/vote.model';
import { objectId } from './custom.validation';

export const createVote = {
    body: Joi.object<IVote>().keys({
        answerId: Joi.string(),
        questionId: Joi.string(),
        commentId: Joi.string(),
        type: Joi.string().valid(...Object.values(VoteType)).required(),
    }).xor('answerId', 'questionId', 'commentId'),
}

export const deleteVote = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
}

export const updateVote = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object<IVote>().keys({
        type: Joi.string().valid(...Object.values(VoteType)).required(),
    }),
}