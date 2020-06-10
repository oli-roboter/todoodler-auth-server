
export default function makeAuthEndpointHandler({ authInfo }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        console.log('POSTIN');
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify({ data: { name: authInfo.user } })
        };
      case 'GET':
        console.log('GETIN');
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify({ data: { name: authInfo.user } })
        };
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