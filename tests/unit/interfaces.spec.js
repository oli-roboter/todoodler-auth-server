/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
import { signupEndpointHandler, loginEndpointHandler, authEndpointHandler } from '../../server/interfaces/index';
import makeAuthEndpointHandler from '../../server/interfaces/auth-endpoint';
import makeLoginEndpointHandler from '../../server/interfaces/login-endpoints';
import makeSignupEndpointHandler from '../../server/interfaces/signup-endpoint';
import { mockRequests } from '../fixtures/mock-data';

describe('unit tests for all route handlers', () => {
  it('returns 405 error for wrong method', async () => {
    const { signup, login, logout, auth } = mockRequests.wrongMethods;

    signupEndpointHandler(signup);
    loginEndpointHandler(login);
    loginEndpointHandler(logout);
    authEndpointHandler(auth);

    const data = await Promise.all([
      signupEndpointHandler(signup),
      loginEndpointHandler(login),
      authEndpointHandler(auth),
    ]);

    data.forEach((res) => expect(res.statusCode).toEqual(405));
  });

  describe('returns 400 for bad request', () => {
    const { signup, login, logout, authNoBody, authNoHeader } = mockRequests.badRequest;
    it('missing username and password for signup', async () => {
      const signupRes = await signupEndpointHandler(signup);
      expect(signupRes.statusCode).toEqual(400);
    });

    it('missing username and password for login', async () => {
      const loginRes = await loginEndpointHandler(login);
      expect(loginRes.statusCode).toEqual(400);
    });

    it('missing username and token for logout', async () => {
      const logoutRes = await loginEndpointHandler(logout);
      expect(logoutRes.statusCode).toEqual(400);
    });

    it('missing username for authentication', async () => {
      const authRes = await authEndpointHandler(authNoBody);
      expect(authRes.statusCode).toEqual(400);
    });

    it('missing token for authentication', async () => {
      const authRes = await authEndpointHandler(authNoHeader);
      expect(authRes.statusCode).toEqual(400);
    });
  });

  describe('returns 500 for other errors', () => {
    const fakeSignupEndpointHandler = makeSignupEndpointHandler({});
    const fakeLoginEndpointHandler = makeLoginEndpointHandler({});
    const fakeAuthEndpointHandler = makeAuthEndpointHandler({});

    const { postRequest, getRequest, deleteRequest } = mockRequests;
    it('signup error', async () => {
      const signupRes = await fakeSignupEndpointHandler(postRequest);
      expect(signupRes.statusCode).toEqual(500);
    });

    it('login error', async () => {
      const loginRes = await fakeLoginEndpointHandler(postRequest);
      expect(loginRes.statusCode).toEqual(500);
    });

    it('logout error', async () => {
      const loginRes = await fakeLoginEndpointHandler(deleteRequest);
      expect(loginRes.statusCode).toEqual(500);
    });

    it('authentication error', async () => {
      const authRes = await fakeAuthEndpointHandler(getRequest);
      expect(authRes.statusCode).toEqual(500);
    });
  });
});
