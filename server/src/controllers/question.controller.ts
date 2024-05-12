import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { questionRepository } from '../repositories';
import { Request, Response } from 'express';
import { questionService } from '../services';

export const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionRepository.create(req.body);
  res.status(httpStatus.CREATED).send(question);
});

export const getQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionService.getQuestion(req.params.id);
  res.status(httpStatus.OK).send(question);
});

export const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await questionRepository.update({ id: req.params.id }, req.body);
  res.status(httpStatus.OK).send(question);
})

export const getQuestions = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.query.amount === 'number') {
    const questions = await questionService.getRandomQuestions({ amount: req.query.amount });
    res.status(httpStatus.OK).send(questions);  
  }
})

// export const getQuestionWithAnswers = catchAsync(async (req: Request, res: Response) => {
//   const question = await questionService.
// });