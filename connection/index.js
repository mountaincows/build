"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbHost = "mongodb://nathanepas:nmontem.96@ds155299.mlab.com:55299/mongoepas";

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log("connected");
                    _context.next = 3;
                    return _mongodb.MongoClient.connect(dbHost).then(function (client) {
                        return client.db();
                    });

                case 3:
                    return _context.abrupt("return", _context.sent);

                case 4:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}));