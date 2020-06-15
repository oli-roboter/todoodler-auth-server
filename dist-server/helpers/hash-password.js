"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hashPassword;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function hashPassword() {
  var hashAndSalt = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
      var salt, hashed;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bcrypt["default"].genSalt();

            case 2:
              salt = _context.sent;
              _context.next = 5;
              return _bcrypt["default"].hash(password, salt);

            case 5:
              hashed = _context.sent;
              return _context.abrupt("return", hashed);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function hashAndSalt(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var checkPassword = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(requestPassword, password) {
      var isTokenValid;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bcrypt["default"].compare(requestPassword, password);

            case 2:
              isTokenValid = _context2.sent;
              return _context2.abrupt("return", isTokenValid);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function checkPassword(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  return Object.freeze({
    hashAndSalt: hashAndSalt,
    checkPassword: checkPassword
  });
}