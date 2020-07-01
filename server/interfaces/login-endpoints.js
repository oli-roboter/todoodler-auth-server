// import winston from 'winston';
import hashPassword from '../helpers/hash-password';
import generateToken from '../helpers/token-generator';

export default function makeLoginEndpointHandler({ authDB, httpResponseHandler }) {
  async function saveToken(username) {
    const token = generateToken();
    // eslint-disable-next-line no-return-await
    return authDB.insertToken(username, token);
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
          const tokenResult = await saveToken(username);
          const { token, workGroup } = tokenResult.value;
          // winston.info('User token created and stored');
          return httpResponseHandler[200]({
            result: {
              result: 'Login complete',
              username,
              token,
              workGroup,
            },
          });
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
      const reqToken = headers['x-todo-token'];
      if (!username || !reqToken) return httpResponseHandler[400]();
      const user = await authDB.findUserByUsername(username);
      const { token } = user[0];

      if (!token) return httpResponseHandler[404]();

      const isTokenValid = reqToken === token;
      // winston.info('User token being validated...');
      if (isTokenValid) {
        const result = await authDB.deleteToken(username, reqToken);
        if (result) return httpResponseHandler[200]({ result: { result: 'Logout complete' } });
        // winston.info('user logged out successfully');
      }
      return httpResponseHandler[403]();
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
