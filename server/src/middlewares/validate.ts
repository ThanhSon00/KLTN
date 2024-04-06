import Joi from 'joi';
import { BAD_REQUEST } from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';

interface ObjectSchema {
  [key: string]: Joi.ObjectSchema,
}

const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'cookies']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
