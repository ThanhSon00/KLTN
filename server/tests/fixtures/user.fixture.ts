import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
// import User from '../../src/models/mysqldb/user.model';
import { userRepository } from '../../src/repositories';
import { UserDocument, UserInput, UserModel } from '../../src/models/mongodb/documents/user.model';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userOne: UserInput = {
  id: faker.database.mongodbObjectId().toString(),
  name: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

export const matchUserOne = {
  id: userOne.id,
  email: userOne.email,
  name: userOne.name,
  isEmailVerified: false,
  avatar: expect.anything(),
}

export const userFour: UserInput = {
  id: faker.database.mongodbObjectId().toString(),
  name: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password,
}

// const insertUsers = async (users) => {
//   await User.bulkCreate(users.map((user) => ({ ...user, password: hashedPassword })));
// };

export const insertUser = async (user: UserInput) => {
  const userDoc = await userRepository.create(user) as UserDocument;
  return userDoc;
}

