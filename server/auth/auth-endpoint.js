import makeHttpError from '../helpers/http-error';

export default function makeAuthEndpointHandler({ dbAuthHandler }) {
  async function getUser(httpRequest) {
    const { body } = httpRequest;
    const { username } = body;
    const users = await dbAuthHandler.getUser(username);
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify({ users }),
    };
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getUser(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
}
