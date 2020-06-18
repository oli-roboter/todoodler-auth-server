import authDB from '../data-access/index';
import makeAuthEndpointHandler from './auth-endpoint';
import makeLoginEndpointHandler from './login-endpoints';
import makeSignupEndpointHandler from './signup-endpoint';

const signupEndpointHandler = makeSignupEndpointHandler({ authDB });
const loginEndpointHandler = makeLoginEndpointHandler({ authDB });
const authEndpointHandler = makeAuthEndpointHandler({ authDB });

export default function makeRequestHandlers() {
  return Object.freeze({
    signupEndpointHandler,
    loginEndpointHandler,
    authEndpointHandler,
  });
}

export { signupEndpointHandler, loginEndpointHandler, authEndpointHandler };
