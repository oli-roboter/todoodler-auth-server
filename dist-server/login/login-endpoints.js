"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeLoginEndpointHandler;

var _winston = _interopRequireDefault(require("winston"));

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

var _hashPassword = _interopRequireDefault(require("../helpers/hash-password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeLoginEndpointHandler(_ref) {
  var dbLoginHandler = _ref.dbLoginHandler;

  function login(_x) {
    return _login.apply(this, arguments);
  }

  function _login() {
    _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(httpRequest) {
      var body, username, password, userData, isPasswordMatch;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              body = httpRequest.body;
              username = body.username, password = body.password;
              _context2.next = 5;
              return dbLoginHandler.login(username);

            case 5:
              userData = _context2.sent;
              isPasswordMatch = _hashPassword["default"].checkPassword(password, userData.password);

              _winston["default"].info('User password validation completed');

              if (!isPasswordMatch) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: {
                  login: 'success'
                }
              });

            case 10:
              _winston["default"].warn('Password is incorrect');

              return _context2.abrupt("return", (0, _httpError["default"])({
                statusCode: 403,
                errorMessage: 'Not authorized.'
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);

              _winston["default"].error(_context2.t0);

              return _context2.abrupt("return", (0, _httpError["default"])({
                statusCode: 400,
                errorMessage: 'Bad request. POST body must be valid JSON.'
              }));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));
    return _login.apply(this, arguments);
  }

  return /*#__PURE__*/function () {
    var _handle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(httpRequest) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = httpRequest.method;
              _context.next = _context.t0 === 'POST' ? 3 : 4;
              break;

            case 3:
              return _context.abrupt("return", login(httpRequest));

            case 4:
              return _context.abrupt("return", (0, _httpError["default"])({
                statusCode: 405,
                errorMessage: "".concat(httpRequest.method, " method not allowed.")
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handle(_x2) {
      return _handle.apply(this, arguments);
    }

    return handle;
  }();
}