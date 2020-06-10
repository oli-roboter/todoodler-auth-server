import makeAuthEndpointHandler from './auth-endpoint';

const authInfo = { user: "Xineibo", token: 123 }
const authEndpointHandler = makeAuthEndpointHandler({ authInfo });

export default authEndpointHandler;