import { Request, Response } from "express";
import httpStatus from "http-status";
import { voteRepository } from "../repositories";
import catchAsync from "../utils/catchAsync";
import { UserDocument } from "models/mongodb/documents/user.model";
import { voteService } from "../services";

export const createVote = catchAsync(async (req: Request, res: Response) => {
    const vote = await voteService.createVote({ ... req.body, voter: (req.user as UserDocument).id })
    res.status(httpStatus.CREATED).send(vote);
})

export const deleteVote = catchAsync(async (req: Request, res: Response) => {
    const vote = await voteRepository.deleteVote(req.params.id);
    res.status(httpStatus.OK).send(vote);
})

export const updateVote = catchAsync(async (req: Request, res: Response) => {
    const vote = await voteRepository.updateVote(req.params.id, req.body);
    res.status(httpStatus.OK).send(vote);
})