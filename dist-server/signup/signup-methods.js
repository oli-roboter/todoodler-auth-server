"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dbMethods;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function dbMethods(_ref) {
  var database = _ref.database;

  var signup = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
      var db, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _winston["default"].info('Adding new user to DB');

              _context.next = 3;
              return database();

            case 3:
              db = _context.sent;
              _context.next = 6;
              return db.collection('users').find({
                username: username
              }).toArray();

            case 6:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function signup(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getUser = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username) {
      var db, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _winston["default"].info('Checking if user already in DB');

              _context2.next = 3;
              return database();

            case 3:
              db = _context2.sent;
              _context2.next = 6;
              return db.collection('users').find({
                username: username
              }).toArray();

            case 6:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getUser(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  return Object.freeze({
    signup: signup,
    getUser: getUser
  });
}