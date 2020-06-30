// import winston from 'winston';
export default function makeAuthEndpointHandler({ authDB, httpResponseHandler }) {
  async function checkUserToken(httpRequest) {
    try {
      const { queryParams, headers } = httpRequest;
      const { username } = queryParams;
      const token = headers['x-todo-token'];
      if (!username || !token) return httpResponseHandler[400]();
      const user = await authDB.findTokenByUsername(username);
      const isTokenValid = token === user[0].token;
      // winston.info('User token being validated...');
      if (isTokenValid) return httpResponseHandler[200]({ result: 'Authorized', token });
      // winston.warn('User token is not valid');
      return httpResponseHandler[403]();
    } catch (e) {
      // winston.error(e);
      return httpResponseHandler[500](e.message);
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return checkUserToken(httpRequest);
      default:
        return httpResponseHandler[405](httpRequest.method);
    }
  };
}
