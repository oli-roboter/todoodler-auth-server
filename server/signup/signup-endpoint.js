import winston from 'winston';
import makeHttpError from '../helpers/http-error';
import hashPassword from '../helpers/hash-password';

export default function makeLSignupEndpointHandler({ dbSignupHandler }) {
  async function signup(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password } = body;
      const userExists = await dbSignupHandler.getUser(username);
      if (userExists.length > 0) {
        winston.warn('Username already exists');
        return makeHttpError({
          statusCode: 403,
          errorMessage: 'Username already exists.',
        });
      }
      const passwordEncryption = hashPassword();
      const encrypedPassword = await passwordEncryption.hashAndSalt(JSON.stringify(password));
      winston.info('Password salted and hashed');
      await dbSignupHandler.signup(username, encrypedPassword);
      winston.info('User signup completed');

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: { signup: 'success' },
      };
    } catch (e) {
      winston.error(e);
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
