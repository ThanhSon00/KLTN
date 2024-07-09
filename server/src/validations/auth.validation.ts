import Joi from 'joi';
import { password } from './custom.validation';
import { IUser } from '../models/mongodb/documents/user.model';
import { IAdmin } from 'models/mongodb/documents/admin.model';
import { LoginRole } from '../middlewares/role';

const register = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      confirmPassword: Joi.ref('password'),
    })
    .with('password', 'confirmPassword'),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  cookies: Joi.object().keys({
    refresh_token: Joi.string().required(),
    access_token: Joi.string(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const newPassword = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const adminLogin = {
  body: Joi.object<IAdmin>().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  newPassword,
  adminLogin,
};
