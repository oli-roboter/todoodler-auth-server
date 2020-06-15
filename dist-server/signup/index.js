"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _signupEndpoint = _interopRequireDefault(require("./signup-endpoint"));

var _index = _interopRequireDefault(require("../db/index"));

var _signupMethods = _interopRequireDefault(require("./signup-methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbSignupHandler = (0, _signupMethods["default"])({
  database: _index["default"]
});
var SignupEndpointHandler = (0, _signupEndpoint["default"])({
  dbSignupHandler: dbSignupHandler
});
var _default = SignupEndpointHandler;
exports["default"] = _default;