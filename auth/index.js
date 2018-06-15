"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (db, req, res, next) {

    if (req.get("Authorization")) {
        var auth = req.get("Authorization");

        // Authorization email:pass, example:
        // HEADERS
        // Authorization : "bmF0aGFuLnNhaW5zYnVyeUBlcGFzLWx0ZC5jb206RXBhc04yMCE3"
        // When converted to ASCII "nathan.sainsbury@epas-ltd.com:EpasN20!7"
        // Then Converted into an array (auth): ["nathan.sainsbury@epas-ltd.com", "EpasN20!7"]
        // auth[0] = email, auth[1] = pass
        // auth[0] can then be used to get the _id and perform queries
        auth = Buffer.from(auth, "base64").toString("ascii").split(":");
        var email = auth[0];
        var pass = auth[1];

        // Use email (auth[0]) to query the DB and check for entries with the same email
        db.collection("api").find({
            email: email
        }).toArray(function (erorrs, results) {

            // The email has found a match
            if (results.length == 1) {
                var salt = results[0].salt;
                var password = results[0].hashPass;
                var hashPass = shajs("sha256").update(pass + salt).digest("hex");

                // The pass (auth[1]) matched the hashed password in the DB
                if (password == hashPass) {
                    //Set user paramter == the results from the DB
                    if (results[0].admin == true) {
                        next();
                        return;
                    } else {
                        res.send({
                            "state": "not an admin"
                        });
                    }
                } else {
                    // The pass (auth[1]) did not match the hashed password in the DB.
                    res.send({
                        "state": "incorrect passsword"
                    });
                }
            } else {
                // Results not equal to 1 were found. This most likely means that the email is incorrect
                res.send({
                    "state": "incorrect email"
                });
            }
        });
    } else {
        // No Authorization header set
        res.send({
            "state": "Authorization header not present, please read the documentation if you are having trouble"
        });
    }
};

var shajs = require('sha.js');