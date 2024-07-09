import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { answerService, commmentService } from "../services";
import { SearchOptions } from "../services/question.service";
import { IUser } from "../models/mongodb/documents/user.model";

export const createAnswer = catchAsync(async (req: Request, res: Response) => {
    const answer = await answerService.createAnswer(req.body);
    res.status(httpStatus.CREATED).send(answer);
});

export const getAnswers = catchAsync(async (req: Request, res: Response) => {
    const questionId = req.query.questionId as string;
    const author = req.query.author as string;
    const { questionId: _, author: __, ...queryOptions } = req.query;
    const answers = await answerService.getAnswers({ questionId, details: { author }}, queryOptions as unknown as SearchOptions);
    res.status(httpStatus.OK).send(answers);
}); 

export const getAnswersCount = catchAsync(async (req: Request, res: Response) => {
    const answersCount = await answerService.getAnswersCount();
    res.status(httpStatus.OK).json(answersCount)
});

export const createAnswerComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await commmentService.createComment({ ...req.body, answerId: req.params.id });
    res.status(httpStatus.CREATED).json(comment)
});

export const updateAnswerComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await commmentService.updateComment(req.params.commentId, req.body.content);
    res.status(httpStatus.OK).send(comment);
});

export const getAnswerComments = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const comments = await commmentService.getComments({ answerId: req.params.id }, user?.id);
    res.status(httpStatus.OK).send(comments);
});

export const updateAnswer = catchAsync(async (req: Request, res: Response) => {
    const answer = await answerService.updateById(req.params.id, req.body);
    res.status(httpStatus.OK).send(answer);
});

export const getAnswer = catchAsync(async (req: Request, res: Response) => {
    const answer = await answerService.getAnswer(req.params.id);
    res.status(httpStatus.OK).send(answer);
});