// import winston from 'winston';
export default function makeUsersEndpointHandler({ authDB, httpResponseHandler }) {
  async function checkUserToken(httpRequest) {
    try {
      // console.log('HTTP Request', httpRequest);
      const { headers, queryParams } = httpRequest;
      const { username } = queryParams;
      const reqToken = headers['x-todo-token'];
      if (!username || !reqToken) return httpResponseHandler[400]();
      const DB = await authDB.findUsersByWorkGroup();
      const user = await DB.findUser(username);
      const { token, workGroup } = user[0];
      const isTokenValid = reqToken === token && token;

      if (isTokenValid) {
        const users = await DB.findUsers(workGroup);
        return httpResponseHandler[200]({
          result: {
            result: 'Users retrieved',
            users,
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
