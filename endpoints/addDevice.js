'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app, db) {
    app.post('/device', function (req, res) {

        var sfID = req.body.sfID;

        // Is the email already registered?
        var collection = db.collection('api');
        collection.find({
            sfID: sfID
        }).toArray(function (e, i) {
            //Email is already registerd
            if (i.length != 0) {
                res.status(409).send({
                    "status": "email already registered"
                });
                return;
            } else {
                collection.insertOne({
                    sfID: sfID
                }, function (e2, i2) {
                    console.log(i2.ops);
                    res.status(200).send({
                        "status": "successfully registered",
                        "mongoId": i2.insertedId,
                        "sfID": i2.ops[0].sfID
                    });
                });
                return;
            }
        });
    });
};

var shajs = require('sha.js');
var validate = require('jsonschema').validate;