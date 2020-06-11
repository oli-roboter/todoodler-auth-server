import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const MONGO_DB = process.env.USERS_DB_URL;
const AUTH_DB = process.env.USERS_DB_NAME;
export {
  PORT,
  NODE_ENV,
  MONGO_DB,
  AUTH_DB,
};
