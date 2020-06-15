// import hashPassword from '../helpers/hash-password';
import winston from 'winston';

export default function dbMethods({ database }) {
  const getUser = async (username) => {
    winston.info('Getting user token');
    const db = await database();
    const result = await db
      .collection('tokens')
      .find({ username })
      .toArray();

    return result;
  };

  return Object.freeze({
    getUser,
  });
}
