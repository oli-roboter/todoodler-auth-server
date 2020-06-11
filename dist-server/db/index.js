"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDb;

var _config = require("../../config/config");

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function makeDb() {
  return _makeDb.apply(this, arguments);
}

function _makeDb() {
  _makeDb = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var MongoClient, url, dbName, client, db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            MongoClient = _mongodb["default"].MongoClient;
            url = _config.MONGO_DB;
            dbName = 'auth';
            client = new MongoClient(url, {
              useNewUrlParser: true
            });
            _context.next = 6;
            return client.connect();

          case 6:
            _context.next = 8;
            return client.db(dbName);

          case 8:
            db = _context.sent;
            db.makeId = makeIdFromString;
            return _context.abrupt("return", db);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeDb.apply(this, arguments);
}

function makeIdFromString(id) {
  return new _mongodb["default"].ObjectID(id);
}