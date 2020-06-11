export default function httpError() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 403,
    data: JSON.stringify({ data: 'Geeeia ERRO' }),
  };
}
