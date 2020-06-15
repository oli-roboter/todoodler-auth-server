"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeHttpError;

function makeHttpError(_ref) {
  var statusCode = _ref.statusCode,
      errorMessage = _ref.errorMessage;
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage
    })
  };
}