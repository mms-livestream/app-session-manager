/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

let Promise = require('bluebird');  //jshint ignore:line
let express = require('express');
let bodyParser = require('body-parser');
let fs = Promise.promisifyAll(require('fs'));
let path = require('path');

//let jwt = require('jwt-simple');
let jwt = require('jsonwebtoken');
let passport = require("passport");
let passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'tasmanianDevil'    //TODO distribute secret securely
};

let config = require('../../config.js');



module.exports = (options) => {

    let service = options.service;
    let router = express.Router();

    router.post('/login', function (req, res) {
        let data = req.body;
	//console.log(typeof(data));
        service.cli.NODE_DB_CONTROLLER.act({role:"users", cmd:"authenticate"}, data, (err, result) => {
            if (result.data.authenticated) {
                let payload = {username: result.data.username};
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                console.log(payload);

                res.json({status: "User authenticated", token: token});
            }
            else {
                //TODO set statusCode 401
                res.json({status: "User not found"});
            }
        });
    });

    router.post('/register', function (req, res) {
        let data = req.body;
        console.log(data);

        service.cli.NODE_DB_CONTROLLER.act({role:"users", cmd:"add"}, data, console.log);
        res.sendStatus(200);
    });

    router.get('/mpd/:id', function (req, res) {
        let id = req.params.id;
        let pathMpd = `${config.DIR_ROOT}/data/mpd/${id}.mpd`;

        if (fs.existsSync(pathMpd)) {
            res.sendFile(pathMpd);
        }

        else {
            res.sendStatus(404);
        }
    });

    return router;
};
