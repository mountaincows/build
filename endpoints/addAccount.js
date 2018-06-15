"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (app, db) {

	app.post('/account', function (req, res) {
		var email = req.body.email;
		var password = req.body.password;
		var salt = randomString();
		var hashPass = shajs("sha256").update(password + salt).digest("hex");

		var collection = db.collection("api");
		collection.find({
			email: email
		}).toArray(function (e, i) {
			if (i.length != 0) {
				res.status(409).send({
					"status": "email already registered"
				});
				return;
			} else {
				collection.insertOne({
					email: email,
					salt: salt,
					hashPass: hashPass
				}, function (e2, i2) {
					res.status(200).send({
						"status": "successfully registered",
						"id": i2.insertedId
					});
				});
				return;
			}
		});
	});
};

var shajs = require('sha.js');

function randomString() {
	var chars = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var results = "";

	for (var i = 0; i < 64; i++) {
		results += chars[Math.round(Math.random() * (chars.length - 1))];
	}

	return results;
}