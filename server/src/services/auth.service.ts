import httpStatus from 'http-status';
import generator from 'generate-password';
import tokenService, { PayloadToken } from './token.service';
import userService from './user.service';
import emailService from './email.service';
import { Token, TokenDocument } from '../models/mongodb/token.model';
import ApiError from '../utils/ApiError';
import { TokenType } from '../config/tokens';
import { tokenRepository, userRepository } from '../repositories';
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken: string) => {
  const refreshTokenData = await tokenRepository.getList({
    token: refreshToken,
    type: TokenType.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenData[0]) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  const result = await tokenRepository.destroy(refreshTokenData[0].id);
};

// /**
//  * Refresh auth tokens
//  * @param {string} refreshToken
//  * @returns {Promise<Object>}
//  */
// const refreshAuth = async (refreshToken) => {
//   try {
//     const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
//     const user = await userService.getUserById(refreshTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await refreshTokenDoc.remove();
//     return tokenService.generateAuthTokens(user);
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
//   }
// };

// /**
//  * Reset password
//  * @param {string} resetPasswordToken
//  * @param {string} newPassword
//  * @returns {Promise}
//  */
// const resetPassword = async (resetPasswordToken, newPassword) => {
//   try {
//     const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, TokenType.RESET_PASSWORD);
//     const user = await userService.getUserById(resetPasswordTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await userService.updateUserById(user.id, { password: newPassword });
//     await Token.deleteMany({ user: user.id, type: TokenType.RESET_PASSWORD });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
//   }
// };

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken: string) => {
  const verifyEmailTokenData = await tokenService.verifyToken(verifyEmailToken, TokenType.VERIFY_EMAIL)
  ;
  const user = await userService.getUserById(verifyEmailTokenData.userId.toString());
  if (!user) {
    throw new Error();
  }
  await tokenRepository.destroy(verifyEmailTokenData.id);
  await userRepository.update(user.id, { isEmailVerified: true });
};

const verifyUser = async (accessToken: string) => {
  const payload = await tokenService.verifyToken(accessToken, TokenType.ACCESS) as PayloadToken;
  const userId = payload.sub;
  return userId;
};

const setNewPassword = async (token: string) => {
  const tokenData = await tokenService.verifyToken(token, TokenType.RESET_PASSWORD) as TokenDocument;
  const user = await userService.getUserById(tokenData.userId.toString());
  const newPassword = generator.generate({ length: 16, numbers: true });
  await userService.setNewPassword(user.id, newPassword);
  await emailService.sendNewPasswordEmail(user.email, newPassword);
  await tokenRepository.destroy(tokenData.id);
};

export default {
  loginUserWithEmailAndPassword,
  logout,
  // refreshAuth,
  // resetPassword,
  verifyEmail,
  verifyUser,
  setNewPassword,
};
