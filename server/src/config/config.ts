import { config } from 'dotenv';
import { join } from 'path';
import joi from 'joi';
import { Sequelize } from 'sequelize';
import {v2 as cloudinary} from 'cloudinary';

config({ path: join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const envVarsSchema = joi.object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(4000),
    MONGODB_URL: joi.string().required().description('Mongo DB url'),
    CLIENT_ORIGIN: joi.string().description('Client origin').default('http://localhost:3000'),
    NLP_ORIGIN: joi.string().description('NLP server origin').default('http://localhost:8000'),
    JWT_SECRET: joi.string().default('thisisasamplesecret').description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi.number().default(10).description('minutes after which verify email token expires'),
    SMTP_HOST: joi.string().description('server that will send the emails').default('smtp-relay.brevo.com'),
    SMTP_PORT: joi.number().description('port to connect to the email server').default(587),
    SMTP_USERNAME: joi.string().description('username for email server').default('20110714@student.hcmute.edu.vn'),
    SMTP_PASSWORD: joi.string().description('password for email server').default('D2Ct8abXq5KHS19V'),
    EMAIL_FROM: joi.string().description('the from field in the emails sent by the app').default('20110714@student.hcmute.edu.vn'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
  secure: true,
  // url: process.env.CLOUDINARY_URL,  
})

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  // sequelize: {
  //   connection: new Sequelize(envVars.MYSQL_URL, { dialect: 'mysql' }),
  //   username: envVars.DB_USERNAME,
  //   password: envVars.DB_PASSWORD,
  //   database: envVars.DB_NAME,
  //   host: envVars.DB_HOST,
  // },
  client: {
    origin: envVars.CLIENT_ORIGIN,
  },
  nlp: {
    origin: envVars.NLP_ORIGIN,
  },
  cloudinary: cloudinary
};
