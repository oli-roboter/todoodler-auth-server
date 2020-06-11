"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeAuthEndpointHandler;

var _httpError = _interopRequireDefault(require("../helpers/http-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeAuthEndpointHandler(_ref) {
  var dbAuthHandler = _ref.dbAuthHandler;

  function getUser(_x) {
    return _getUser.apply(this, arguments);
  }

  function _getUser() {
    _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(httpRequest) {
      var body, username, users;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              body = httpRequest.body;
              username = body.username;
              _context2.next = 4;
              return dbAuthHandler.getUser(username);

            case 4:
              users = _context2.sent;
              return _context2.abrupt("return", {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify({
                  users: users
                })
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _getUser.apply(this, arguments);
  }

  return /*#__PURE__*/function () {
    var _handle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(httpRequest) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = httpRequest.method;
              _context.next = _context.t0 === 'GET' ? 3 : 4;
              break;

            case 3:
              return _context.abrupt("return", getUser(httpRequest));

            case 4:
              return _context.abrupt("return", (0, _httpError["default"])());

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