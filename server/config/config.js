import dotenv from 'dotenv';

dotenv.confiqg();

const { AUTH_PORT, NODE_ENV, MONGO_ATLAS_URL } = process.env;
// const MONGO_DB = process.env.USERS_DB_URL;
const MONGO_DB = MONGO_ATLAS_URL;
const PORT = AUTH_PORT;
// console.log("MONGO_DB:", MONGO_DB);
// console.log("PORT:", PORT);
// console.log('PROCESS ENV', process.env);

export {
  PORT,
  NODE_ENV,
  MONGO_DB,
};
