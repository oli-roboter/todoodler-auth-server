/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import adaptRequest from '../../server/helpers/adapt-request';
import hashPassword from '../../server/helpers/hash-password';
import httpHandler from '../../server/helpers/http-handler';
import generateToken from '../../server/helpers/token-generator';

const passwordEncription = hashPassword();

describe('testing adaptRequest function', () => {
  test('adaptRequest returns empty object if request is empty', () => {
    expect(adaptRequest()).toBe.empty;
  });

  test('adaptRequest returns correct object if http request is correct', () => {
    const request = {
      path: '/v1/login/olympus',
      method: 'POST',
      body: { username: 'Oliver' },
    };
    const response = adaptRequest(request);
    expect(response.body.username).toEqual('Oliver');
    expect(response.path).toEqual('/v1/login/olympus');
    expect(response.method).toEqual('POST');
    expect(response.params).toBe(undefined);
  });

  test('adaptRequest does not process unknown keys', () => {
    const request = { username: 'Oliver' };
    const response = adaptRequest(request);
    // eslint-disable-next-line no-prototype-builtins
    expect(response.hasOwnProperty('username')).toBe(false);
  });
});

describe('testing password encription and decription', () => {
  test('token generator generates the token correctly', () => {
    const token = generateToken();
    expect(token.length).toBe(43);
    expect(token).toMatch(/[A-Za-z0-9+/=]/);
  });

  test('hash password returns hashed password', async () => {
    const password = '123';
    const hashedPasseword = await passwordEncription.hashAndSalt(password);
    expect(hashedPasseword).not.toEqual(password);
  });

  test('decripting hashed password should return original password', async () => {
    const password = '123';
    const hashedPassword = await passwordEncription.hashAndSalt(password);
    const decryptedSuccess = await passwordEncription.checkPassword(password, hashedPassword);
    const decryptedFail = await passwordEncription.checkPassword('124', hashedPassword);
    expect(decryptedSuccess).toBe(true);
    expect(decryptedFail).toBe(false);
  });
});

test('it generates an error message with success set to false, and statusCode 400 and error message', () => {
  const customError = httpHandler[400]();
  const errorData = customError.data;
  expect(customError.statusCode).toEqual(400);
  expect(errorData.success).toBe(false);
  expect(errorData.error).toEqual('Bad request');
  expect(customError.headers).not.toBe.empty;
});
