import makeAuthEndpointHandler from './auth-endpoint';
//import DB
//import DB method handler

const dbMethodHandler = { user: "Xineibo", token: 123 }
const authEndpointHandler = makeAuthEndpointHandler({ dbMethodHandler });

export default authEndpointHandler;