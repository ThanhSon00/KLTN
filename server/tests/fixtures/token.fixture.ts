import moment from 'moment';
import config from '../../src/config/config';
import { TokenTypes } from '../../src/config/tokens';
import { tokenService } from '../../src/services';
import { userOne } from '../fixtures/user.fixture';

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
export const userOneAccessToken = tokenService.generateToken(userOne.id as string, accessTokenExpires, TokenTypes.ACCESS);
// const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);
