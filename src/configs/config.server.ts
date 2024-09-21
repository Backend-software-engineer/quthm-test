import dotenv from 'dotenv';
import path from 'path';
import Logger from '../common/utils/logger.js';
// import { logger } from 'src/logger';

const env = process.env.NODE_ENV || 'development';
// logger.info(`Connected with environment ${env}`);
dotenv.config({
  debug: env !== 'production',
  path: path.resolve(process.cwd(), 'env', `.env.${env}`),
});
export const port = process.env.PORT || 3500;
export const environment = env;
export const workSpaceEmail = process.env.WORKSPACE_EMAIL ?? '';
Logger.info(`Connected with environment ${environment}`)
