import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import config from '../config/config';
import { userRepository } from '../repositories';
import { CookieOptions, Request, Response } from 'express';
import { IAdmin } from '../models/mongodb/documents/admin.model';

const { jwt } = config;
const day = 24 * 60 * 60 * 1000;
const minute = 1000 * 60;
const accessTokenOptions = (isAdmin = false): CookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    maxAge: jwt.accessExpirationMinutes * minute,
    sameSite: 'none',
    path: isAdmin ? '/v2' : '/v1'
}};

const refreshTokenOptions = (isAdmin = false): CookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    maxAge: jwt.refreshExpirationDays * day,
    sameSite: 'none',
    path: isAdmin ? '/v2' : '/v1'
}}

const setCookies = (res: Response, { access, refresh }: { access: { token: string }, refresh: { token: string }}, isAdmin = false) => {
  res.cookie('access_token', access.token, accessTokenOptions(isAdmin));
  res.cookie('refresh_token', refresh.token, refreshTokenOptions(isAdmin));
};

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user.id);
  const token = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, token);

  setCookies(res, tokens);
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const { access, refresh } = await tokenService.generateAuthTokens(user.id);

  setCookies(res, { access, refresh });
  res.status(200).send(user);
});

const logout = (isAdmin = false) => catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.cookies.refresh_token);
  res.clearCookie('access_token', accessTokenOptions(isAdmin));
  res.clearCookie('refresh_token', refreshTokenOptions(isAdmin));
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.body.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.cookies.access_token) return res.status(httpStatus.NO_CONTENT).send();
  const userId = await authService.verifyUser(req.cookies.access_token);
  const user = await userRepository.getById(userId);
  res.status(httpStatus.OK).json(user);
});

const newPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.setNewPassword(req.body.token);
  res.status(httpStatus.OK).send();
});

const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const isAdmin = true;
  const { name, password } = req.body;
  const admin = await authService.loginAdmin(name, password);
  const { access, refresh } = await tokenService.generateAuthTokens(admin.id);

  setCookies(res, { access, refresh }, isAdmin);
  res.status(httpStatus.OK).send(admin);
})

const verifyAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IAdmin;
  res.status(httpStatus.OK).send(user);
})

export default {
  register,
  login,
  logout,
  forgotPassword,
  verifyEmail,
  verifyUser,
  newPassword,
  adminLogin,
  verifyAdmin
};
