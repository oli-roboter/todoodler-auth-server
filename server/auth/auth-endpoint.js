
export default function makeAuthEndpointHandler({ authInfo }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return checkAuth({ authInfo })
      default:
        console.log('ERROR');
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 403,
          data: JSON.stringify({ data: 'Geeeia ERRO' })
        };
    }
  }
}

const checkAuth = ({ username, password }) => {
  console.log(username, password)
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200,
    data: JSON.stringify({ data: { username, password } })
  };
}