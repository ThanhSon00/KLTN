import { UserDocument } from "../models/mongodb/user.model";
import { TokenType } from "../config/tokens";
import { TokenDocument, TokenInput } from "../models/mongodb/token.model";

import jwt, { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import config from '../config/config';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { tokenRepository } from '../repositories';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

export interface PayloadToken extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: TokenType;
}

const generateToken = (userId: string, expires: moment.Moment, type: TokenType, secret: string = config.jwt.secret): string => {
  const payload: PayloadToken = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async ({token, userId, expires, type, blacklisted}: TokenInput) => {
  const tokenData = await tokenRepository.create({
    token,
    userId,
    expires,
    type,
    blacklisted,
  });
  return tokenData;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenType) => {
  let payload: any;
  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Exprired token');
    } 
  }

  if (type === TokenType.ACCESS) {
    return payload as PayloadToken;
  }

  if (!payload.sub) throw new Error();
  const userId = payload.sub.toString();
  const tokenData = await tokenRepository.getList({ token, type, userId, blacklisted: false });


  if (!tokenData[0]) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not found');
  }
  return tokenData[0] as TokenDocument;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: UserDocument) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
  await saveToken({ token: refreshToken, userId: user.id, expires: refreshTokenExpires.toDate(), type: TokenType.REFRESH});

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, TokenType.RESET_PASSWORD);
  await saveToken({ token: resetPasswordToken, userId: user.id, expires: expires.toDate(), type: TokenType.RESET_PASSWORD});
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: UserDocument) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, TokenType.VERIFY_EMAIL);
  await saveToken({token: verifyEmailToken, userId: user.id, expires: expires.toDate(), type: TokenType.VERIFY_EMAIL});
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
