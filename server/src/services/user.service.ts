import httpStatus from 'http-status';
import { Answer, Question, User } from '../models/mongodb/documents';
import ApiError from '../utils/ApiError';
import { answerRepository, questionRepository, userRepository } from '../repositories';
import { ObjectId } from 'mongoose';
import { IUser, UserDocument } from '../models/mongodb/documents/user.model';
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

export interface SearchOptions {
  limit: number
  sortDesc?: string,
  page: number,
}

const createUser = async (userBody: Partial<IUser>) => {
  if (userBody.email && await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (userBody.name && await User.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const user = await User.create(userBody)
  return user as UserDocument;
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: string) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user as UserDocument;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string) => {
  const users = await userRepository.getList({ email });
  const user = users[0];
  return user;
};

const getAdminByName = async (name: string) => {
  const users = await userRepository.getList({ name, role: 'admin' });
  const user = users[0];
  return user;
}

// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
const updateUserById = async (userId: string, updateBody: Partial<IUser>) => {
  await getUserById(userId);
  const user = await userRepository.update(userId, updateBody);
  return user;
};

const setNewPassword = async (userId: string, newPassword: string) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.password = newPassword;
  await user.save();
  return user;
};

const getUserQuestions = async (userId: string, filterOptions: { answersCount?: number }, queryOptions?: { amount: number, page: number }) => {
  if (!queryOptions) return []; 
  const filter = { author: userId }
  console.log(filterOptions);
  if (filterOptions.answersCount || filterOptions.answersCount === 0) {
    Object.assign(filter, { answersCount: filterOptions.answersCount })
  }
  return await questionRepository.getList(filter, { 
    limit: queryOptions?.amount,
    skip: (queryOptions.page - 1) * queryOptions.amount,
  })
}
const getUserAnswers = async (userId: string, queryOptions: { amount: number, page: number }) => {
  return await answerRepository.getList({ details: { author: userId }}, { 
    limit: queryOptions.amount,
    skip: (queryOptions.page - 1) * queryOptions.amount,
  })
}

const countQuestions = async (userId: string) => {
  return await Question.countDocuments({ author: userId });
}

const countAnswers = async (userId: string) => {
  return await Answer.countDocuments({ details: { author: userId }});
}

const getUsersCount = async () => {
  return await User.estimatedDocumentCount();
}

const getUsers = async (filter: Partial<IUser>, searchOptions: SearchOptions) => {
  const { limit, page } = searchOptions;
  return await userRepository.getList(filter, {
    limit,
    skip: (page - 1) * limit,
    sort: { [`${searchOptions.sortDesc}`]: -1 },
  })
}

const searchUsers = async (text: string, searchOptions: SearchOptions) => {
  const { limit, page } = searchOptions;
  const users = await userRepository.getList({ $or: [
    { name: { $regex: new RegExp(text, 'i')} },
    { email: { $regex: new RegExp(text, 'i')} },
    { phoneNumber: { $regex: new RegExp(text, 'i')} },
  ]}, { limit, skip: (page - 1) * limit })

  const usersCount = await User.countDocuments({ $or: [
    { name: { $regex: new RegExp(text, 'i')} },
    { email: { $regex: new RegExp(text, 'i')} },
    { phoneNumber: { $regex: new RegExp(text, 'i')} },
  ]});
  return {
    users,
    usersCount,
  };
}

export default {
  searchUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  setNewPassword,
  getUserAnswers,
  countQuestions,
  countAnswers,
  getUserQuestions,
  getUsersCount,
  getUsers,
  getAdminByName,
};
