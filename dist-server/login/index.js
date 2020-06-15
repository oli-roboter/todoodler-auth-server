"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loginEndpoints = _interopRequireDefault(require("./login-endpoints"));

var _index = _interopRequireDefault(require("../db/index"));

var _loginMethods = _interopRequireDefault(require("./login-methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbLoginHandler = (0, _loginMethods["default"])({
  database: _index["default"]
});
var loginEndpointHandler = (0, _loginEndpoints["default"])({
  dbLoginHandler: dbLoginHandler
});
var _default = loginEndpointHandler;
exports["default"] = _default;