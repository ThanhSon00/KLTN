import express from 'express';
import helmet from 'helmet';
// import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import config from './config/config';
import morgan from './config/morgan';
import { jwtStrategy } from './config/passport';
// import { authLimiter } from './middlewares/rateLimiter';
import routesV1 from './routes/v1';
import routesV2 from './routes/v2';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import path from 'path';
import { authenticateToken } from './middlewares/authenticateToken';

const app = express();

app.use('/static', express.static(path.join(__dirname, '../../client/build')));
app.use('/static/uploads', express.static(path.join(__dirname, '/public/uploads')));

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(cookieParser());
app.use(authenticateToken);
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({ origin: config.client.origin, credentials: true }));
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1', routesV1);
app.use('/v2', routesV2);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
