"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authEndpoint = _interopRequireDefault(require("./auth-endpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import DB
//import DB method handler
var dbMethodHandler = {
  user: "Xineibo",
  token: 123
};
var authEndpointHandler = (0, _authEndpoint["default"])({
  dbMethodHandler: dbMethodHandler
});
var _default = authEndpointHandler;
exports["default"] = _default;