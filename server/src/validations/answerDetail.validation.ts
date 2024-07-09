import Joi from "joi";
import { objectId } from "./custom.validation";
import { AnswerDetailUpdate } from "models/mongodb/subdocuments/answerDetail.model";

export const updateAnswerDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object<AnswerDetailUpdate>().keys({
        content: Joi.string(),
        isBestAnswer: Joi.boolean(),
    })
}

export const getAnswerDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
}

