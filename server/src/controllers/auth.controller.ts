import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import config from '../config/config';
import { userRepository } from '../repositories';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const { jwt } = config;
const day = 24 * 60 * 60 * 1000;
const minute = 1000 * 60;
const setCookies = (res: Response, { access, refresh }: { access: { token: string }, refresh: { token: string }}) => {
  res.cookie('access_token', access.token, {
    httpOnly: true,
    secure: true,
    maxAge: jwt.accessExpirationMinutes * minute,
  });

  res.cookie('refresh_token', refresh.token, {
    httpOnly: true,
    secure: true,
    maxAge: jwt.refreshExpirationDays * day,
  });
};

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  const token = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, token);

  setCookies(res, tokens);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const { access, refresh } = await tokenService.generateAuthTokens(user);

  setCookies(res, { access, refresh });
  res.status(200).send(user);
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.cookies.refresh_token);
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.status(httpStatus.NO_CONTENT).send();
});

// const refreshTokens = catchAsync(async (req: Request, res: Response) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.body.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.cookies.access_token) return res.status(httpStatus.NO_CONTENT);

  const userId = await authService.verifyUser(req.cookies.access_token);
  const user = await userRepository.getById(userId);
  res.status(httpStatus.OK).json(user);
});

const newPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.setNewPassword(req.body.token);
  res.status(httpStatus.OK).send();
});

export default {
  register,
  login,
  logout,
  // refreshTokens,
  forgotPassword,
  // resetPassword,
  // sendVerificationEmail,
  verifyEmail,
  verifyUser,
  newPassword,
};
