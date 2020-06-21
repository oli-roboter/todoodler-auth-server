/**Test all the routes in sequence.
 * use axios to send requests and use a fake db test container:
 *https://andreybleme.com/2019-05-28/integration-tests-with-docker/
 *
 * signup
 * login with wrong password
 * login -> store token as variable
 * authorise - use stored token
 * logout with wrong token
 * logout -> check if userdata was deleted from token db
 *
 *
 *
 *
 *
 *
 */