"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = adaptRequest;

function adaptRequest() {
  var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.parans,
    queryParams: req.query,
    body: req.body
  });
}