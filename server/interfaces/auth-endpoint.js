// import winston from 'winston';
export default function makeAuthEndpointHandler({ authDB, httpResponseHandler }) {
  async function checkUserToken(httpRequest) {
    try {
      const { queryParams, headers } = httpRequest;
      const { username } = queryParams;
      const reqToken = headers['x-todo-token'];
      if (!username || !reqToken) return httpResponseHandler[400]();
      const user = await authDB.findUserByUsername(username);
      const { token, workGroup } = user[0];
      const isTokenValid = reqToken === token && token;
      // winston.info('User token being validated...');
      if (isTokenValid) {
        return httpResponseHandler[200]({
          result: {
            result: 'Authorized',
            username,
            workGroup,
            token,
          },
        });
      }
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
