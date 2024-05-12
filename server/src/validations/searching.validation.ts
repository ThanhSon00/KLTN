import Joi from 'joi';

export const searching = {
    query: Joi.object().keys({
        text: Joi.string().required(),
        amount: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required(),
        page: Joi.number()
            .integer()
            .min(1)
            .required(),
    }),
}
