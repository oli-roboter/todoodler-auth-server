/* eslint-disable no-undef */
import { GenericContainer } from 'testcontainers';
// // import winston from 'winston';
import makeAuthDB from './db';
import { setUrl, makeDb } from '../../tests/fixtures/db';
import { testUser } from '../../tests/fixtures/mock-data';

describe('Integration test for database functions', () => {
  let container;
  let fakeDb;
  const {
    username, password, token, newToken,
  } = testUser;

  beforeAll(async (done) => {
    // winston.info('initialising testcontainer with database');
    container = await new GenericContainer('mongo', '4.4.0-rc8')
      .withExposedPorts(27017)
      .start();
    // winston.info('Container started');
    // const hostaddress = await container.getContainerIpAddress();
    const mappedPort = await container.getMappedPort(27017);
    // winston.info('container address:', hostaddress, mappedPort);

    setUrl(`mongodb://localhost:${mappedPort}`);
    fakeDb = makeAuthDB({ makeDb });
    done();
  }, 15000);

  afterAll(async () => {
    container.stop();
    // winston.info('testcontainer stopped');
  });

  it('inserts user and password into database', async () => {
    const response = await fakeDb.insertUser(username, password);
    expect(response.result.n).toEqual(1);
    expect(response.result.ok).toEqual(1);
  });

  it('finds user by username', async () => {
    const user = await fakeDb.findUserByUsername(username);
    expect(user[0].username).toEqual(username);
  });

  it('inserts token', async () => {
    const response = await fakeDb.insertToken(username, token);
    expect(response.result.n).toEqual(1);
    expect(response.result.ok).toEqual(1);
  });

  it('finds token by username', async () => {
    const user = await fakeDb.findTokenByUsername(username);
    expect(user[0].username).toEqual(username);
    expect(user[0].token).toEqual(token);
  });

  it('updates token by username', async () => {
    await fakeDb.insertToken(username, newToken);
    const user = await fakeDb.findTokenByUsername(username);
    expect(user[0].username).toEqual(username);
    expect(user[0].token).toEqual(newToken);
    expect(user.length).toEqual(1);
  });

  it('deletes token by username', async () => {
    const response = await fakeDb.deleteToken(username, newToken);
    const tokenResponse = await fakeDb.findTokenByUsername(username);
    expect(response).toBe(true);
    expect(tokenResponse.length).toEqual(0);
  });
});
