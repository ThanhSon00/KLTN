import { FilterQuery, ObjectId, QueryOptions } from 'mongoose';
import { User } from '../models/mongodb/documents';
import { IUser, UserDocument, UserInput } from '../models/mongodb/documents/user.model';

const getById = async (id: string) => {
  const user = await User.findById(id) as UserDocument;
  return user;
};

const getList = (filter: FilterQuery<IUser>, queryOptions?: QueryOptions<IUser & { lean: true }>) => {
  return User.find(filter, null, queryOptions);
};

const create = (userBody: UserInput) => {
  return User.create({ ...userBody, _id: userBody.id });
};

const update = (id: string, userBody: Partial<IUser>) => {
  return User.findByIdAndUpdate(id, userBody, { new: true })
}

export default {
  getById,
  getList,
  create,
  update,
};
