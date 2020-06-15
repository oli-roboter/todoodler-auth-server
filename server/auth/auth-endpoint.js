import winston from 'winston';
import makeHttpError from '../helpers/http-error';

export default function makeAuthEndpointHandler({ dbAuthHandler }) {
  async function checkUserToken(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, token } = body;
      const users = await dbAuthHandler.getUser(username);
      const isTokenValid = token === users.token;
      winston.info('User token validated');
      if (isTokenValid) {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 200,
          data: isTokenValid,
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
        statusCode: 400,
        errorMessage: 'Bad request. GET body must be valid JSON.',
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
