/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let jwt = require('jsonwebtoken');
let passport = require("passport");
let passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secret: 'tasmanianDevil'
};



module.exports = (options) => {

    let service = options.service;
    let router = express.Router();

    router.post('/login', function (req, res) {
        let data = req.body;
        service.client.act({role:"users", cmd:"authenticate"}, data, (err, result) => {
            if (result.data.authenticated) {
                let payload = {id_user: result.data.id_user};
                let token = jwt.sign(payload, jwtOptions.secret);
                res.json({code: 200, status: "User authenticated", token: token});
            }
            else {
                res.json({code: 401, status: "User not found"});
            }
        });
    });

    router.post('/register', function (req, res) {
        let data = req.body.data;
        console.log(data);

        service.client.act({role:"uploader", cmd:"add"}, data, console.log);
        res.sendStatus(200);
    });

    return router;
};
