'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app, db) {

    app.put('/data/:deviceID', function (req, res) {

        (0, _auth2.default)(db, req, res, next);

        function next() {

            var collection = db.collection('api');
            var data = req.body.data;
            var sfID = req.params.deviceID;

            collection.update({
                sfID: sfID
            }, {
                $push: {
                    "data": {
                        $each: [{
                            "dateSet": data,
                            "time": Math.floor(Date.now() / 1000)
                        }],
                        $position: 0
                    }
                }
            }, function (err, obj) {
                if (!err) {
                    res.send({
                        "state": "success",
                        sfID: sfID,
                        data: data
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