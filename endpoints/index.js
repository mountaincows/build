"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app, db) {
    (0, _addData2.default)(app, db);
    (0, _addDevice2.default)(app, db);
    (0, _getData2.default)(app, db);
    (0, _addAccount2.default)(app, db);
};

var _addData = require("./addData");

var _addData2 = _interopRequireDefault(_addData);

var _addDevice = require("./addDevice");

var _addDevice2 = _interopRequireDefault(_addDevice);

var _getData = require("./getData");

var _getData2 = _interopRequireDefault(_getData);

var _addAccount = require("./addAccount");

var _addAccount2 = _interopRequireDefault(_addAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }