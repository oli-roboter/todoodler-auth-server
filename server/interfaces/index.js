import authDB from '../data-access/index';
import makeAuthEndpointHandler from './auth-endpoint';
import makeLoginEndpointHandler from './login-endpoints';
import makeSignupEndpointHandler from './signup-endpoint';

const signupEndpointHandler = makeSignupEndpointHandler({ authDB });
const loginEndpointHandler = makeLoginEndpointHandler({ authDB });
const authEndpointHandler = makeAuthEndpointHandler({ authDB });

export { signupEndpointHandler, loginEndpointHandler, authEndpointHandler };
