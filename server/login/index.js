import makeLoginEndpointHandler from './login-endpoints';
import database from '../db/index';
import loginMethods from './login-methods';

const dbLoginHandler = loginMethods({ database });
const loginEndpointHandler = makeLoginEndpointHandler({ dbLoginHandler });

export default loginEndpointHandler;
