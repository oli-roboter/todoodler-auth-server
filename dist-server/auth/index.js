"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authEndpoint = _interopRequireDefault(require("./auth-endpoint"));

var _index = _interopRequireDefault(require("../db/index"));

var _authMethods = _interopRequireDefault(require("./auth-methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbAuthHandler = (0, _authMethods["default"])({
  database: _index["default"]
});
var authEndpointHandler = (0, _authEndpoint["default"])({
  dbAuthHandler: dbAuthHandler
});
var _default = authEndpointHandler;
exports["default"] = _default;