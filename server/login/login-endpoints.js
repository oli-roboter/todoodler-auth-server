import winston from 'winston';
import makeHttpError from '../helpers/http-error';
import hashPassword from '../helpers/hash-password';

export default function makeLoginEndpointHandler({ dbLoginHandler }) {
  async function login(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password } = body;
      const userData = await dbLoginHandler.login(username);
      const isPasswordMatch = hashPassword.checkPassword(password, userData.password);
      winston.info('User password validation completed');
      if (isPasswordMatch) {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 200,
          data: { login: 'success' },
        };
      }
      winston.warn('Password is incorrect');
      return makeHttpError({
        statusCode: 403,
        errorMessage: 'Not authorized.',
      });
    } catch (e) {
      winston.error(e);
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. POST body must be valid JSON.',
      });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return login(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
