/* eslint-disable padded-blocks */
import axios from 'axios';

import { testUser } from './fixtures/mock-data';


describe('e2e test for all routes', () => {

  it('sends a the wrong request method to /signup', () => {

  });

  it('sends a the wrong request method to /login', () => {

  });

  it('sends a the wrong request method to /authorise', () => {

  });

  it('sends a POST request with empty body to /signup', () => {

  });

  it('sends username and password to /signup', () => {

  })
  it('sends a POST request with existing user to /signup', () => {

  });

  it('tries to login with an empty request body', () => {

  });

  it('tries to login with wrong password', () => {

  });

  it('logs in successfully and returns token', () => {

  });

  it('tries to authorise without token', () => {

  });

  it('it authorises successfully', () => {

  });

  it('it fails to authorised with invalid token', () => {

  });
});
