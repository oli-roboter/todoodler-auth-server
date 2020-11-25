import dotenv from 'dotenv';

dotenv.config();

const { AUTH_PORT, NODE_ENV, MONGO_ATLAS_URL } = process.env;
// const MONGO_DB = process.env.USERS_DB_URL;
const MONGO_DB = MONGO_ATLAS_URL;
const PORT = AUTH_PORT;
console.log("MONGO_DB:", MONGO_DB);
console.log("PORT:", PORT);

export {
  PORT,
  NODE_ENV,
  MONGO_DB,
};
