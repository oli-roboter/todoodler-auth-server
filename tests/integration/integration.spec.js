/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { GenericContainer } from 'testcontainers';
import makeAuthDB from '../../server/data-access/db';
import { setUrl, makeDb } from '../fixtures/db';
import { mockRequests } from '../fixtures/mock-data';
import makeAuthEndpointHandler from '../../server/interfaces/auth-endpoint';
import makeLoginEndpointHandler from '../../server/interfaces/login-endpoints';
import makeSignupEndpointHandler from '../../server/interfaces/signup-endpoint';
import httpResponseHandler from '../../server/helpers/http-handler';

describe('Integration test for all routes', () => {
  let container;
  let authDB;
  let signupEndpointHandler;
  let loginEndpointHandler;
  let authEndpointHandler;
  let token;

  beforeAll(async (done) => {
    // winston.info('initialising testcontainer with database');
    container = await new GenericContainer('mongo', '4.4.0-rc8')
      .withExposedPorts(27017)
      .start();
    // const hostaddress = await container.getContainerIpAddress();
    const mappedPort = await container.getMappedPort(27017);

    setUrl(`mongodb://localhost:${mappedPort}`);
    authDB = makeAuthDB({ makeDb });
    signupEndpointHandler = makeSignupEndpointHandler({ authDB, httpResponseHandler });
    loginEndpointHandler = makeLoginEndpointHandler({ authDB, httpResponseHandler });
    authEndpointHandler = makeAuthEndpointHandler({ authDB, httpResponseHandler });
    done();
  }, 15000);

  afterAll(async () => {
    container.stop();
  });
  test('successful sign up', async () => {
    const { signupRequest } = mockRequests;
    const response = await signupEndpointHandler(signupRequest);
    expect(response.statusCode).toEqual(201);
    expect(response.data.data.result).toEqual('Signup complete');
  });

  test('fail to signup same user again', async () => {
    const { signupRequest } = mockRequests;
    const response = await signupEndpointHandler(signupRequest);
    expect(response.statusCode).toEqual(409);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toEqual('Username already exists');
  });

  test('successful login', async () => {
    const { postRequest } = mockRequests;
    const response = await loginEndpointHandler(postRequest);
    token = response.data.token;
    expect(response.statusCode).toEqual(200);
    expect(response.data.data.result).toEqual('Login complete');
    expect(response.data.token.length).toBeGreaterThan(20);
  });

  test('fail to login due to wrong password', async () => {
    const { wrongPasswordRequest } = mockRequests;
    const response = await loginEndpointHandler(wrongPasswordRequest);
    expect(response.statusCode).toEqual(403);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toEqual('Not authorized');
  });

  test('successful authorisation', async () => {
    const { getRequest } = mockRequests;
    getRequest.headers = { 'x-todo-token': token };
    const response = await authEndpointHandler(getRequest);

    expect(response.statusCode).toEqual(200);
    expect(response.data.data.result).toEqual('Authorized');
    expect(response.data.token.length).toBeGreaterThan(20);
  });

  it('fails to authorise due to wrong token', async () => {
    const { getRequest } = mockRequests;
    getRequest.headers = { 'x-todo-token': 'falsetoken' };
    const response = await authEndpointHandler(getRequest);
    expect(response.statusCode).toEqual(403);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toEqual('Not authorized');
  });

  it('successful logout', async () => {
    const { deleteRequest } = mockRequests;
    deleteRequest.headers = { 'x-todo-token': token };
    const response = await loginEndpointHandler(deleteRequest);
    expect(response.statusCode).toEqual(200);
    expect(response.data.data.result).toEqual('Logout complete');
  });

  it('fails to logout (user not logged in)', async () => {
    const { deleteRequest } = mockRequests;
    deleteRequest.headers = { 'x-todo-token': token };
    const response = await loginEndpointHandler(deleteRequest);
    expect(response.statusCode).toEqual(404);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toEqual('User does not seem to be logged in');
  });
});
