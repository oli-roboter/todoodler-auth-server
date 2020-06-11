"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = httpError;

function httpError() {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 403,
    data: JSON.stringify({
      data: 'Geeeia ERRO'
    })
  };
}