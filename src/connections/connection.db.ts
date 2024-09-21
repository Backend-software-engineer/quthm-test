import mongoose from 'mongoose';
import { getDbName } from '../common/utils/db-utils.js';
import Logger from '../common/utils/logger.js';

import mongooseConfig from '../configs/config.database.js';

export async function mongooseConnect() {
  const dbName = getDbName(mongooseConfig.getUri());
  try {
    mongoose.set('strictQuery', true);
    mongoose.connection.on('error', (error) => {
      Logger.error(
        `Ops! There was an unexpected error ${error.message} connecting to the database: ${dbName}`,
      );
    });
    const conn = await mongoose.connect(
      mongooseConfig.getUri(),
      mongooseConfig.getOptions(),
    );
    Logger.info('Connected with database: ' + dbName);
    return conn;
  } catch (error) {
    Logger.error(
      `Ops! There was an unexpected error ${error.message} connecting to the database: ${dbName}`,
    );
    throw error;
  }
}
