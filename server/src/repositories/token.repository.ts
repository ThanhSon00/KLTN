import { ObjectId } from 'mongoose';
import { Token } from '../models/mongodb/documents';
import { TokenDoc, TokenInput } from '../models/mongodb/documents/token.model';

export const create = (tokenBody: TokenInput) => {
  return Token.create(tokenBody);
};

export const getList = (filter: Partial<TokenInput>) => {
  return Token.find(filter);
};

export const getById = (id: ObjectId) => {
  return Token.findById(id);
};

export const destroy = (id: ObjectId) => {
  return Token.deleteOne({ _id: id });
};
