import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { notificationService, userService } from '../services';
import { Request, Response } from 'express';
import { removeFalsyProperties } from '../utils/removeFalsyProperties';
import { not } from 'joi';

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});


export const updateUser = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error
  const avatar = req.files?.['avatar']?.[0].path;
  // @ts-expect-error
  const cover = req.files?.['cover']?.[0].path;
  const updateImages: { avatar?: string, cover?: string } = { avatar, cover }
  const user = await userService.updateUserById(req.params.id, { 
    ...removeFalsyProperties(updateImages),
    ...req.body
  });

  res.status(httpStatus.OK).send(user);
});

export const getUserAnswers = catchAsync(async (req: Request  , res: Response) => {
  const answers = await userService.getUserAnswers(req.params.id, { 
    amount: parseInt(req.query.amount as string), 
    page: parseInt(req.query.page as string),
  });
  res.status(httpStatus.OK).send(answers);
})

export const getUserQuestionsCount = catchAsync(async (req: Request, res: Response) => {
  const count = await userService.countQuestions(req.params.id);
  
  res.status(httpStatus.OK).json(count);
})

export const getUserAnswersCount = catchAsync(async (req: Request, res: Response) => {
  const count = await userService.countAnswers(req.params.id);
  res.status(httpStatus.OK).json(count);
})

export const getUserQuestions = catchAsync(async (req: Request, res: Response) => {
  //@ts-expect-error
  const answersCount = (req.query.answersCount || req.query.answersCount === 0)
    ? { answersCount: parseInt(req.query.answersCount as string) }
    : {};
  const questions = await userService.getUserQuestions(req.params.id, answersCount, { 
    amount: parseInt(req.query.amount as string), 
    page: parseInt(req.query.page as string),
  });
  res.status(httpStatus.OK).send(questions);
})

export const getUsersCount = catchAsync(async (req: Request, res: Response) => {
  const count = await userService.getUsersCount();
  res.status(httpStatus.OK).json(count);
})

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { limit, page, sortDesc, ...filterOptions } = req.query;
  const users = await userService.getUsers(filterOptions, {
    limit: parseInt(limit as string),
    page: parseInt(page as string),
    sortDesc: sortDesc as string,
  })
  res.status(httpStatus.OK).send(users);
})

export const searchUsers = catchAsync(async (req: Request, res: Response) => {
  const { limit, page, ...filterOptions } = req.query;
  const { info } = filterOptions as { info: string };
  const { users, usersCount } = await userService.searchUsers(info, { 
    limit: parseInt(limit as string),
    page: parseInt(page as string),
  });
  res.status(httpStatus.OK).send({
    users, usersCount
  });
})

export const getUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit, page } = req.query;
  const notifications = await notificationService
    .getUserNotifications(
      id, 
      parseInt(limit as string), 
      parseInt(page as string),
    );
  res.status(httpStatus.OK).send(notifications);
})

export const countUnseenUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const unseenCount = await notificationService.countUnSeenNotification(id);
  res.status(httpStatus.OK).json(unseenCount);
})

export const markNotificationAsRead = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const notification = await notificationService.markNotificationAsRead(notificationId);
  res.status(httpStatus.OK).send(notification);
})