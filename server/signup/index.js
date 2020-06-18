import makeSignupEndpointHandler from './signup-endpoint';
import database from '../data-access/index';
import signupMethods from './signup-methods';

const dbSignupHandler = signupMethods({ database });
const SignupEndpointHandler = makeSignupEndpointHandler({ dbSignupHandler });

export default SignupEndpointHandler;
