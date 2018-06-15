"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _endpoints = require("./endpoints");

var _endpoints2 = _interopRequireDefault(_endpoints);

var _connection = require("./connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

(0, _connection2.default)().then(function (db) {
    (0, _endpoints2.default)(app, db);
}, function (rejection) {
    console.log("failed");
});

app.listen(8080);