'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app, db) {
    app.get('/data/:deviceID', function (req, res) {

        (0, _auth2.default)(db, req, res, next);

        function next() {

            var collection = db.collection("api");
            var id = req.params.deviceID;
            console.log(id);

            collection.find({
                "sfID": id
            }).toArray(function (e, i) {
                if (i.length != 1) {
                    res.status(409).send({
                        "status": "no ID found"
                    });
                    return;
                } else {
                    console.log(i.data);
                    res.status(200).send({
                        "status": "success",
                        "data": i[0].data
                    });
                }
            });
        }
    });
};

var _auth = require('./../auth');

var _auth2 = _interopRequireDefault(_auth);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }