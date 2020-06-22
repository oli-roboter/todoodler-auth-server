import winston from 'winston';
import makeHttpError from '../helpers/http-error';

export default function makeAuthEndpointHandler({ authDB }) {
  async function checkUserToken(httpRequest) {
    try {
      const { body, headers } = httpRequest;
      const { username } = body;
      const token = headers['x-todo-token'];
      if (!username || !token) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request.',
        });
      }
      const user = await authDB.findTokenByUsername(username);
      const isTokenValid = token === user.token;
      winston.info('User token being validated...');
      if (isTokenValid) {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 200,
          data: token,
        };
      }
      winston.warn('User token is not valid');
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
      case 'GET':
        return checkUserToken(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
