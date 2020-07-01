// import winston from 'winston';
import hashPassword from '../helpers/hash-password';

export default function makeSignupEndpointHandler({ authDB, httpResponseHandler }) {
  async function signup(httpRequest) {
    try {
      const { body } = httpRequest;
      const { username, password, workGroup } = body;
      if (!username || !password || !workGroup) return httpResponseHandler[400]();
      const userExists = await authDB.findUserByUsername(username);
      if (userExists.length > 0) {
        // winston.warn('Username already exists');
        return httpResponseHandler[409]();
      }
      const passwordEncryption = hashPassword();
      const encrypedPassword = await passwordEncryption.hashAndSalt(password);
      // winston.info('Password salted and hashed');
      await authDB.insertUser(username, encrypedPassword, workGroup);
      // winston.info('User signup completed');

      return httpResponseHandler[201]({ result: { result: 'Signup complete' } });
    } catch (e) {
      // winston.error(e);
      return httpResponseHandler[500](e.message);
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return signup(httpRequest);
      default:
        return httpResponseHandler[405](httpRequest.method);
    }
  };
}
