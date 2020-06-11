import makeAuthEndpointHandler from './auth-endpoint';
import database from '../db/index';
import authMethods from './auth-methods';

const dbAuthHandler = authMethods({ database });
const authEndpointHandler = makeAuthEndpointHandler({ dbAuthHandler });

export default authEndpointHandler;
