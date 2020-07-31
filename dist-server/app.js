"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _config = _interopRequireDefault(require("winston/lib/winston/config"));

var _loggerConfig = _interopRequireDefault(require("../config/logger-config"));

var _adaptRequest = _interopRequireDefault(require("./helpers/adapt-request"));

var _interfaces = require("./interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _loggerConfig.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({
      data: {
        success: false,
        error: 'Bad request, username or password are not valid'
      }
    });
  }

  next();
});

function expressCallback(requestHandler) {
  return function reqRes(req, res) {
    const httpRequest = (0, _adaptRequest.default)(req);
    requestHandler(httpRequest).then(({
      headers,
      statusCode,
      data
    }) => {
      res.set(headers).status(statusCode).send(data);
    }).catch(e => {
      _config.default.error(e);

      res.send(status(500).end());
    });
  };
}

app.get('/test', (req, res) => {
  console.log('Hitting the test');
  res.send('test success');
});
app.use('/authorise', expressCallback(_interfaces.authEndpointHandler));
app.use('/login', expressCallback(_interfaces.loginEndpointHandler));
app.use('/signup', expressCallback(_interfaces.signupEndpointHandler));
app.use('/users', expressCallback(_interfaces.userEndpointHandler));
var _default = app;
exports.default = _default;