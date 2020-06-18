import winston from 'winston';
import makeHttpError from '../helpers/http-error';
import hashPassword from '../helpers/hash-password';
import generateToken from '../helpers/token-generator';

export default function makeLoginEndpointHandler({ authDB }) {
  async function saveToken(username) {
    const token = generateToken();
    // eslint-disable-next-line no-return-await
    await authDB.insertToken(username, token);
    return token;
  }

  async function login(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password } = body;
      const userData = await authDB.findUserByUsername(username);
      if (userData.length > 0) {
        winston.info('Checking user info');
        const passwordEncryption = hashPassword();
        const isPasswordMatch = await passwordEncryption
          .checkPassword(password, userData[0].password);
        if (isPasswordMatch) {
          const token = await saveToken(username);
          return {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 200,
            data: { login: 'success', token },
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

  async function logout(httpRequest) {
    try {
      const { body, headers } = httpRequest;
      const token = headers['x-todo-token'];
      const { username } = body;
      await authDB.deleteToken(username, token);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: { logout: 'success' },
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
        return login(httpRequest);
      case 'DELETE':
        return logout(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
