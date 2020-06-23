// import winston from 'winston';
import hashPassword from '../helpers/hash-password';
import generateToken from '../helpers/token-generator';

export default function makeLoginEndpointHandler({ authDB, httpResponseHandler }) {
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
      if (!username || !password) return httpResponseHandler[400]();
      const userData = await authDB.findUserByUsername(username);
      if (userData.length > 0) {
        // winston.info('Checking user info');
        const passwordEncryption = hashPassword();
        const isPasswordMatch = await passwordEncryption
          .checkPassword(password, userData[0].password);
        if (isPasswordMatch) {
          const token = await saveToken(username);
          // winston.info('User token created and stored');
          return httpResponseHandler[200]({ result: 'Login complete', token });
        }
      }
      // winston.warn('Username or password are incorrect');
      return httpResponseHandler[403]();
    } catch (e) {
      // winston.error(e);
      return httpResponseHandler[500](e.message);
    }
  }

  async function logout(httpRequest) {
    try {
      const { body, headers } = httpRequest;
      const { username } = body;
      const token = headers['x-todo-token'];
      if (!username || !token) return httpResponseHandler[400]();
      const result = await authDB.deleteToken(username, token);
      if (result) return httpResponseHandler[200]({ result: 'Logout complete' });
      // winston.info('user logged out successfully');
      return httpResponseHandler[404]();
    } catch (e) {
      // winston.error(e);
      return httpResponseHandler[500](e.message);
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return login(httpRequest);
      case 'DELETE':
        return logout(httpRequest);
      default:
        return httpResponseHandler[405](httpRequest.method);
    }
  };
}
