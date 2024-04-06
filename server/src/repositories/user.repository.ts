import { ObjectId } from 'mongoose';
import { User } from '../models/mongodb';
import { IUser, UserDocument, UserInput } from '../models/mongodb/user.model';

const getById = async (id: string) => {
  const user = await User.findById(id) as UserDocument;
  return user;
};

const getList = (filter: Partial<IUser>) => {
  return User.find(filter);
};

const create = (userBody: UserInput) => {
  return User.create({ ...userBody, _id: userBody.id });
};

const update = (id: string, userBody: Partial<IUser>) => {
  return User.findByIdAndUpdate(id, userBody)
}
export default {
  getById,
  getList,
  create,
  update,
};
