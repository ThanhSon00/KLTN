import httpStatus from 'http-status';
import { User } from '../models/mongodb';
import ApiError from '../utils/ApiError';
import { userRepository } from '../repositories';
import { ObjectId } from 'mongoose';
import { IUser, UserDocument } from '../models/mongodb/user.model';
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
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

// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateUserById = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };

// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

const setNewPassword = async (userId: string, newPassword: string) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.password = newPassword;
  await user.save();
  return user;
};

export default {
  createUser,
  // queryUsers,
  getUserById,
  getUserByEmail,
  // updateUserById,
  // deleteUserById,
  setNewPassword,
};
