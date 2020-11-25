import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV } = process.env;
// const MONGO_DB = process.env.USERS_DB_URL;
const MONGO_DB = process.env.MONGO_ATLAS_URL;

export {
  PORT,
  NODE_ENV,
  MONGO_DB,
};
