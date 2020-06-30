const makeHttpError = ({ statusCode, errorMessage }) => ({
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode,
  data: {
    success: false,
    error: errorMessage,
  },
});

const makeHttpResponse = ({ statusCode, response }) => {
  const { result, token } = response;
  const data = {
    success: true,
    error: null,
    data: result,
  };
  if (token) data.token = token;
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode,
    data,
  };
};

const httpResponseHandler = {
  200: (response) => makeHttpResponse({ statusCode: 200, response }),
  201: (response) => makeHttpResponse({ statusCode: 201, response }),
  400: () => makeHttpError({ statusCode: 400, errorMessage: 'Bad request' }),
  403: () => makeHttpError({ statusCode: 403, errorMessage: 'Not authorized' }),
  404: () => makeHttpError({ statusCode: 404, errorMessage: 'User does not seem to be logged in' }),
  405: (method) => makeHttpError({ statusCode: 405, errorMessage: `${method} method not allowed` }),
  409: () => makeHttpError({ statusCode: 409, errorMessage: 'Username already exists' }),
  500: (errorMessage) => makeHttpError({ statusCode: 500, errorMessage }),
};

export default httpResponseHandler;
