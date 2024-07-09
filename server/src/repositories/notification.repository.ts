import { Notification } from "../models/mongodb/documents"
import { INotification, NotiInput, NotiUpdate } from "../models/mongodb/documents/notification.model"
import { FilterQuery, QueryOptions } from "mongoose";

export const create = (notiBody: NotiInput) => {
  return Notification.create(notiBody);
}

export const getList = (filter: FilterQuery<INotification>, queryOptions?: QueryOptions) => {
  return Notification.find(filter, {}, queryOptions);
}

export const update = (id: string, updateBody: NotiUpdate) => {
  return Notification.findByIdAndUpdate(id, updateBody, { new: true });
}