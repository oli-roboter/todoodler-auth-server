import winston from 'winston';

export default function dbMethods({ database }) {
  const signup = async (username, password) => {
    winston.info('Adding new user to DB');
    const db = await database();
    const result = await db
      .collection('users')
      .insertOne({ username, password });

    return result;
  };

  const getUser = async (username) => {
    winston.info('Checking if user already in DB');
    const db = await database();
    const result = await db
      .collection('users')
      .find({ username })
      .toArray();

    return result;
  };

  return Object.freeze({
    signup,
    getUser,
  });
}
