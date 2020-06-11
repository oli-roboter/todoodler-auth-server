"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeAuthEndpointHandler;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeAuthEndpointHandler(_ref) {
  var authInfo = _ref.authInfo;
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
              return _context.abrupt("return", checkAuth({
                authInfo: authInfo
              }));

            case 4:
              console.log('ERROR');
              return _context.abrupt("return", {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 403,
                data: JSON.stringify({
                  data: 'Geeeia ERRO'
                })
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handle(_x) {
      return _handle.apply(this, arguments);
    }

    return handle;
  }();
}

var checkAuth = function checkAuth(_ref2) {
  var username = _ref2.username,
      password = _ref2.password;
  console.log(username, password);
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200,
    data: JSON.stringify({
      data: {
        username: username,
        password: password
      }
    })
  };
};