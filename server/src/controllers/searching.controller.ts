import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { searchingService } from '../services';
import { Request, Response } from 'express';

export const searching = catchAsync(async (req: Request, res: Response) => {
    const result = await searchingService.fullTextSearch({ 
        text: req.query.text as string, 
        amount: parseInt(req.query.amount as string),
        page: parseInt(req.query.page as string)
    });
    res.status(httpStatus.OK).send(result);
});

