import { Admin, AdminDocument, IAdmin } from "../models/mongodb/documents/admin.model";
import { FilterQuery } from "mongoose";

export const getList = async (filter: FilterQuery<IAdmin>): Promise<AdminDocument[]> => {
    return await Admin.find(filter);
}