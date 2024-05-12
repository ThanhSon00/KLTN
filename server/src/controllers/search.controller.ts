import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import searchRepository from "../repositories/search.repository";
import httpStatus from "http-status";
import { searchService } from "../services";

export const refresh = catchAsync(async (req: Request, res: Response) => {
    await searchService.refresh();
    res.status(httpStatus.OK).send(); 
})

export const init = catchAsync(async (req: Request, res: Response) => {
    await searchService.init();
    res.status(httpStatus.CREATED).send();
})