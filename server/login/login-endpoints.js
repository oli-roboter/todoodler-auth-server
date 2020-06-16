import winston from 'winston';
import makeHttpError from '../helpers/http-error';
import hashPassword from '../helpers/hash-password';

export default function makeLoginEndpointHandler({ dbLoginHandler }) {
  async function login(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password } = body;
      const userData = await dbLoginHandler.login(username);
      if (userData.length > 0) {
        winston.info('Checking user info');
        const isPasswordMatch = hashPassword.checkPassword(password, userData.password);
        if (isPasswordMatch) {
          return {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: { login: 'success' },
          };
        }
      }
      winston.warn('Username or password are incorrect');
      return makeHttpError({
        statusCode: 403,
        errorMessage: 'Not authorized.',
      });
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
        return login(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
