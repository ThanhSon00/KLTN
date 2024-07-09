import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { answerRepository, questionRepository } from '../repositories';
import { Request, Response } from 'express';
import { answerService, questionService } from '../services';
import { SearchOptions } from 'services/question.service';
import { IUser, UserDocument } from 'models/mongodb/documents/user.model';

export const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionRepository.create(req.body);
  res.status(httpStatus.CREATED).send(question);
});

export const getQuestion = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)?.id || undefined;
  const increaseView = true;
  const question = await questionService.getQuestion(req.params.id, userId, increaseView);
  res.status(httpStatus.OK).send(question);
});

export const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionRepository.update({ id: req.params.id }, req.body);
  res.status(httpStatus.OK).send(question);
})

export const getQuestions = catchAsync(async (req: Request, res: Response) => {
  const questions = await questionService.getQuestions(req.query as unknown as SearchOptions);
  res.status(httpStatus.OK).send(questions);  
})

export const getQuestionsCount = catchAsync(async (req: Request, res: Response) => {
  const questionCount = await questionService.countQuestions();
  res.status(httpStatus.OK).json(questionCount);
})

export const getAnsweredPercentage = catchAsync(async (req: Request, res: Response) => {
  const percentage = await questionService.getAnsweredPercentage();
  res.status(httpStatus.OK).json(percentage);
})