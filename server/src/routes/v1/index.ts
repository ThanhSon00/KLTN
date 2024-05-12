import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import questionRoute from './question.route';
import answerRoute from './answer.route';
import answerDetailRoute from './answerDetail.route';
import searchRoute from './search.route';
import searchingRoute from './searching.route';

// import docsRoute from './docs.route';
// import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
  {
    path: '/answers',
    route: answerRoute,
  },
  {
    path: '/answers/details',
    route: answerDetailRoute,
  },
  {
    path: '/searches',
    route: searchRoute,
  },
  {
    path: '/searching',
    route: searchingRoute,
  }
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
