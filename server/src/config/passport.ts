import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import config from './config';
import { TokenType } from './tokens';
import { User } from '../models/mongodb';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: VerifiedCallback) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

