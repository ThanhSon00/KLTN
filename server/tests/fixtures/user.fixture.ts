import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
// import User from '../../src/models/mysqldb/user.model';
import { userRepository } from '../../src/repositories';
import { UserDocument, UserInput, UserModel } from '../../src/models/mongodb/user.model';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userThree: UserInput = {
  id: faker.database.mongodbObjectId(),
  name: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

export const userFour: UserInput = {
  id: faker.database.mongodbObjectId(),
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
