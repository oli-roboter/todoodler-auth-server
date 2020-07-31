"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashPassword;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-return-await */
const convertToString = password => {
  if (typeof password === 'string') return password;
  return JSON.stringify(password);
};

function hashPassword() {
  const hashAndSalt = async password => {
    const returnStringPassword = convertToString(password);
    return await _bcrypt.default.hash(returnStringPassword, 10);
  };

  const checkPassword = async (requestPassword, password) => {
    const passwordToCompare = convertToString(requestPassword);
    return await _bcrypt.default.compare(passwordToCompare, password);
  };

  return Object.freeze({
    hashAndSalt,
    checkPassword
  });
}