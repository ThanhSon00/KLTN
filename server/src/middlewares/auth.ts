import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { roleRights } from '../config/roles'
import { NextFunction, Request, Response } from 'express';

const verifyCallback = (
  req: Request, 
  resolve: { (value: unknown): void }, 
  reject: { (reason?: any): void; (arg0: ApiError): any; }, 
  requiredRights: (string | undefined)[],
  force: boolean,
) => async (
  err: any, 
  user: Express.User | undefined, 
  info: any) => {
  if (force && (err || info || !user)) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  if (user) req.user = user;
  // if (requiredRights.length) {
  //   const userRights = roleRights.get(user.role);
  //   const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
  //   if (!hasRequiredRights && req.params.userId !== user.id) {
  //     return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  //   }
  // }

  resolve('done');
};

export const auth =
  (force = false, ...requiredRights: (string | undefined)[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights, force))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
