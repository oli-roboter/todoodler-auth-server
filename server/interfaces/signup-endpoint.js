// import winston from 'winston';
import makeHttpError from '../helpers/http-error';
import hashPassword from '../helpers/hash-password';

export default function makeLSignupEndpointHandler({ authDB }) {
  async function signup(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password } = body;
      if (!username || !password) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request.',
        });
      }
      const userExists = await authDB.findUserByUsername(username);
      if (userExists.length > 0) {
        // winston.warn('Username already exists');
        return makeHttpError({
          statusCode: 403,
          errorMessage: 'Username already exists.',
        });
      }
      const passwordEncryption = hashPassword();
      const encrypedPassword = await passwordEncryption.hashAndSalt(password);
      // winston.info('Password salted and hashed');
      await authDB.insertUser(username, encrypedPassword);
      // winston.info('User signup completed');

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        data: { signup: 'success' },
      };
    } catch (e) {
      // winston.error(e);
      return makeHttpError({
        statusCode: 500,
        errorMessage: e.message,
      });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return signup(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
