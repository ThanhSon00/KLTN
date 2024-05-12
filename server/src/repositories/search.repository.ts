import { ISearch, SearchInput } from "models/mongodb/documents/search.model"
import { Question, Search } from "../models/mongodb/documents"
import questionRepository from "./question.repository";
import { FilterQuery } from "mongoose";

const update = async ({ filter, id }: { id?: string, filter?: object}, searchBody?: Partial<ISearch>) => {
    if (id) return await Search.findByIdAndUpdate(id, searchBody);
    else if (filter) return await Search.findOneAndUpdate(filter, searchBody, { new: true, upsert: true });
}

const create = async (searchBody: SearchInput) => {
    return await Search.create(searchBody);
}


const getList = async (filter: any) => {
    return await Search.find(filter);
}

export default {
    update,
    create,
    getList,
}