/* eslint-disable import/prefer-default-export */
export const testUser = {
  username: 'Teddy Test',
  password: '12345678',
  wrongPassword: '87654321',
  token: '123test-token321',
  newToken: '123new-token321',
};

export const mockRequests = {
  wrongMethods: {
    signup: { method: 'GET' },
    login: { method: 'GET' },
    logout: { method: 'POST' },
    auth: { method: 'DELETE' },
  },
  badRequest: {
    signup: { method: 'POST', body: {} },
    login: { method: 'POST', body: { password: testUser.password } },
    logout: { method: 'DELETE', headers: {}, body: { username: testUser.username } },
    authNoParams: { method: 'GET', headers: { 'x-todo-token': 12345 }, queryParams: {} },
    authNoHeader: { method: 'GET', headers: {}, queryParams: { username: testUser.username } },
  },
  postRequest: {
    method: 'POST',
    headers: { 'x-todo-token': 12345 },
    body: { username: testUser.username, password: testUser.password },
  },
  getRequest: {
    method: 'GET',
    headers: { 'x-todo-token': 12345 },
    queryParams: { username: testUser.username },
  },
  deleteRequest: {
    method: 'DELETE',
    headers: { 'x-todo-token': 12345 },
    body: { username: testUser.username },
  },
  signupRequest: {
    method: 'POST',
    body: { username: testUser.username, password: testUser.password },
  },
  wrongPasswordRequest: {
    method: 'POST',
    body: { username: testUser.username, password: testUser.wrongPassword },
  },
};
