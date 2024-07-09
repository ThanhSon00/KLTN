import Joi from 'joi';

import { password, objectId } from './custom.validation';
import { Gender, IUser } from '../models/mongodb/documents/user.model';
import { INotification, NotiType } from '../models/mongodb/documents/notification.model';
import { IQuestion } from 'models/mongodb/documents/question.model';

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    limit: Joi.number().integer().required().min(1).max(15),
    page: Joi.number().integer().required().min(1),
    name: Joi.string(),
    sortDesc: Joi.string().valid('points', 'views', 'questions', 'answers'),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object<IUser>()
    .keys({
      isBanned: Joi.string().valid('true', 'false'),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      confirmPassword: Joi.ref('password'),
      name: Joi.string(),
      avatar: Joi.string().valid(""),
      cover: Joi.string().valid(""),
      description: Joi.string().allow(""),
      age: Joi.number().integer().min(18).max(100),
      phoneNumber: Joi.string().allow(""),
      gender: Joi.string().valid(...Object.values(Gender)).allow(""),
      city: Joi.string().allow(""),
    })
    .with('password', 'confirmPassword')
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export const getUserAnswers = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    amount: Joi.number().integer().max(10).required(),
    page: Joi.number().integer().required(),
  }),
}

export const getUserQuestionsCount = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
}

export const getUserAnswersCount = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
}

export const getUserQuestions = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  query: Joi.object<IQuestion & { page: number, amount: number}>().keys({
    amount: Joi.number().integer().max(10).required(),
    page: Joi.number().integer().required(),
    answersCount: Joi.number().integer(),
  }),
}

export const getUsersCount = {
  query: Joi.object<IUser>().keys({
    
  }),
}

export const searchUsers = {
  query: Joi.object().keys({
    info: Joi.string().required(),
    limit: Joi.number().integer().min(5).max(15).required(),
    page: Joi.number().integer().required(),
  }),
}

export const getUserNotifications = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    limit: Joi.number().integer().required().min(1).max(15),
    page: Joi.number().integer().required().min(1),
  }),
}

export const countUnseenUserNotifications = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
}

export const markNotificationAsRead = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
    notificationId: Joi.required().custom(objectId),
  }),
}

export default {
  searchUsers,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserAnswers,
  getUserQuestionsCount,
  getUserAnswersCount,
  getUserQuestions,
  getUsersCount,
  getUserNotifications,
  countUnseenUserNotifications,
  markNotificationAsRead,
}