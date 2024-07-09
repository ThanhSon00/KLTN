import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { reportService } from "../services";

export const createReport = catchAsync(async (req: Request, res: Response) => {
    const report = await reportService.createReport({ ...req.body, _id: req.body.id });
    res.status(httpStatus.CREATED).send(report);
});

export const getReports = catchAsync(async (req: Request, res: Response) => {
    const { limit, page, sortDesc, ...filterOptions } = req.query;
    const reports = await reportService.getReports(filterOptions, { 
        limit: Number(limit), 
        page: Number(page),
        sortDesc: sortDesc as string,
    });
    res.status(httpStatus.OK).send(reports);
});

export const updateReport = catchAsync(async (req: Request, res: Response) => {
    const report = await reportService.updateReport(req.params.id, req.body);
    res.status(httpStatus.OK).send(report);
});