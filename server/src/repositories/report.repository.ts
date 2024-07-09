import { QueryOptions } from "mongoose";
import { IReport, Report, ReportInput } from "./../models/mongodb/documents/report.model";

export const create = (reportBody: ReportInput) => {
    return Report.create({ ...reportBody, _id: reportBody.id });
}

export const getList = (filter: Partial<ReportInput>, queryOptions?: QueryOptions<IReport & { lean: true }>) => {
    return Report.find(filter, {}, queryOptions);
}

export const getById = (id: string) => {
    return Report.findById(id);
}

export const update = (id: string, reportBody: Partial<IReport>) => {
    return Report.findByIdAndUpdate(id, reportBody, { new: true });
}