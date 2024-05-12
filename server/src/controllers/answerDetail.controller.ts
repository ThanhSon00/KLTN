import { Request, Response } from "express";
import httpStatus from "http-status";
import { answerDetailService } from "../services";
import catchAsync from "../utils/catchAsync";

export const updateAnswerDetail = catchAsync(async (req: Request, res: Response) => {
    const answerDetail = await answerDetailService.updateContent(req.params.id, req.body);
    res.status(httpStatus.OK).send(answerDetail);
})

export const getAnswerDetail = catchAsync(async (req: Request, res: Response) => {
    const answerDetail = await answerDetailService.getAnswerDetail(req.params.id);
    res.status(httpStatus.OK).send(answerDetail);
})