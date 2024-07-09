import Joi from 'joi';
import { objectId } from './custom.validation';
import { IReport, ReportStatus, ReportType } from '../models/mongodb/documents/report.model';

export const createReport = {
    body: Joi.object<IReport>().keys({
        id: Joi.string().custom(objectId),
        details: Joi.string().required(),
        reporter: Joi.string().required().custom(objectId),
        answerId: Joi.string().custom(objectId),
        questionId: Joi.string().custom(objectId),
        userId: Joi.string().custom(objectId),
        type: Joi.string().required().valid(...Object.values(ReportType)),
    }),
};

export const getReports = {
    query: Joi.object<IReport & { limit: number, page: number, sortDesc:string }>().keys({
        type: Joi.string().valid(...Object.values(ReportType)),
        limit: Joi.number().required().max(5).min(1),
        page: Joi.number().required().min(1),
        sortDesc: Joi.string().required().valid('createdAt'),
    }),
}

export const updateReport = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object<IReport>().keys({
        status: Joi.string().required().valid(...[ReportStatus.approved, ReportStatus.rejected]),
        response: Joi.string().required(),
    }),
};  