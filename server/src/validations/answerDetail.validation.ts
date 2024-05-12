import Joi from "joi";
import { objectId } from "./custom.validation";

export const updateAnswerDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        content: Joi.string().required(),
    })
}

export const getAnswerDetail = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
}

