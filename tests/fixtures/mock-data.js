/* eslint-disable import/prefer-default-export */
export const testUser = {
  username: 'Teddy Test',
  password: '12345678',
  token: '123test-token321',
  newToken: '123new-token321',
};

export const mockRequests = {
  wrongMethods: {
    signup: { method: 'GET' },
    login: { method: 'GET' },
    auth: { method: 'DELETE' },
  },
  badRequest: {
    signup: { method: 'POST', body: {} },
    login: { method: 'POST', body: { password: testUser.password } },
    authNoBody: { method: 'GET', headers: { 'x-todo-token': 12345 }, body: {} },
    authNoHeader: { method: 'GET', headers: {}, body: { username: testUser.username } },
  },
  postRequest: {
    method: 'POST',
    headers: { 'x-todo-token': 12345 },
    body: { username: testUser.username, password: testUser.password },
  },
  getRequest: {
    method: 'GET',
    headers: { 'x-todo-token': 12345 },
    body: { username: testUser.username },
  },
};
