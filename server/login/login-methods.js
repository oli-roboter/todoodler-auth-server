// import hashPassword from '../helpers/hash-password';
import winston from 'winston';

export default function dbMethods({ database }) {
  const login = async (username) => {
    winston.info('Checking login details');

    const db = await database();
    const result = await db
      .collection('users')
      .find({ username })
      .toArray();

    return result;
  };

  return Object.freeze({
    login,
  });
}
