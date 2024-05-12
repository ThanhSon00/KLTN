import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { answerRepository } from "../repositories";
import httpStatus from "http-status";
import { answerService } from "../services";

export const createAnswer = catchAsync(async (req: Request, res: Response) => {
    const answer = await answerRepository.create(req.body);
    res.status(httpStatus.CREATED).send(answer);
});

export const getAnswers = catchAsync(async (req: Request, res: Response) => {
    const answers = await answerRepository.getList(req.query);
    res.status(httpStatus.OK).send(answers);
}); 
