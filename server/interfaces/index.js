import authDB from '../data-access/index';
import httpResponseHandler from '../helpers/http-handler';
import makeAuthEndpointHandler from './auth-endpoint';
import makeLoginEndpointHandler from './login-endpoints';
import makeSignupEndpointHandler from './signup-endpoint';
import makeUsersEndpointHandler from './users-endpoint';

const signupEndpointHandler = makeSignupEndpointHandler({ authDB, httpResponseHandler });
const loginEndpointHandler = makeLoginEndpointHandler({ authDB, httpResponseHandler });
const authEndpointHandler = makeAuthEndpointHandler({ authDB, httpResponseHandler });
const userEndpointHandler = makeUsersEndpointHandler({ authDB, httpResponseHandler });

export {
  signupEndpointHandler,
  loginEndpointHandler,
  authEndpointHandler,
  userEndpointHandler,
};
