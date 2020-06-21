import { GenericContainer } from 'testcontainers';
import makeAuthDB from './db';
import { setUrl, makeDb } from '../../tests/fixtures/db';

describe('Integration test for database functions', () => {
  let container;
  let fakeDb;

  beforeAll(async (done) => {
    console.log('initialising testcontainer with database');
    container = await new GenericContainer('mongo', '4.4.0-rc8')
      .withExposedPorts(27017)
      .start();
    console.log('Container started');
    const hostaddress = await container.getContainerIpAddress();
    const mappedPort = await container.getMappedPort(27017);
    console.log('container address:', hostaddress, mappedPort);

    setUrl(`mongodb://localhost:${mappedPort}`);
    fakeDb = makeAuthDB({ makeDb });
    done();
  }, 30000);

  afterAll(async () => {
    container.stop();
    console.log('testcontainer stopped');
  });

  it('inserts user and password into database', async (done) => {
    await fakeDb.insertUser('Teddy Testicle', 123);
    const user = await fakeDb.findUserByUsername('Teddy Testicle');
    expect(user[0].username).toEqual('Teddy Testicle');
    done();
  }, 15000);
});
