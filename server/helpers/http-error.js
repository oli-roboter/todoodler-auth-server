export default function makeHttpError({ statusCode, errorMessage }) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode,
    data: {
      success: false,
      error: errorMessage,
    },
  };
}
