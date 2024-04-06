import { beforeAll, beforeEach, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import config from '../../src/config/config';

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;

// const clearAllData = async () => {
//   await config.sequelize.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
//   // eslint-disable-next-line security/detect-non-literal-fs-filename
//   await config.sequelize.connection.truncate({ force: true, cascade: true });

//   await config.sequelize.connection.query('SET FOREIGN_KEY_CHECKS = 1;');
// };
