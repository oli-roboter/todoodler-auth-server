"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _config = _interopRequireDefault(require("winston/lib/winston/config"));

var _loggerConfig = _interopRequireDefault(require("../config/logger-config"));

var _adaptRequest = _interopRequireDefault(require("./helpers/adapt-request"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _loggerConfig["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));

function expressCallback(requestHandler) {
  return function reqRes(req, res) {
    var httpRequest = (0, _adaptRequest["default"])(req);
    requestHandler(httpRequest).then(function (_ref) {
      var headers = _ref.headers,
          statusCode = _ref.statusCode,
          data = _ref.data;
      res.set(headers).status(statusCode).send(data);
    })["catch"](function (e) {
      _config["default"].error(e);

      res.send(status(500).end());
    });
  };
}

app.use('/authorise', expressCallback(_auth["default"])); // app.use('/login', expressCallback(handleLoginRequest));

var _default = app;
exports["default"] = _default;