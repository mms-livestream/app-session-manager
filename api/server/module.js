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

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let user = jwt_payload;
  console.log('Payload received:', jwt_payload);
  // TODO database call to verify if user in mongodb
  /*
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }*/
  if (user.id) {
    next(null, user);
  }
  else {
    next(null, false);
  }
});

passport.use(strategy);

let config = require('../../config.js');

module.exports = (options) => {

    let service = options.service;
    let router = express.Router();
    let socketio = options.socketio;

    let authRouter = express.Router();  //protected routes
    authRouter.use(passport.initialize());

    router.post('/login', function (req, res) {
        let data = req.body;
	      console.log("LOGIN");
        console.log(data);
        service.cli.NODE_DB_CONTROLLER.act({role:"users", cmd:"authenticate"}, data, (err, result) => {
            if (result.data.authenticated) {
                let payload = {id: result.data.id, username: result.data.username};
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
        console.log("REGISTER");
        console.log(data.username);

        service.cli.NODE_DB_CONTROLLER.act({role:"users", cmd:"add"}, data, function(err, result) {
          console.log(result);
          res.sendStatus(200);
        });

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

    //Protected routes

    router.use("/auth", authRouter);

    authRouter.get('/connect', passport.authenticate('jwt', { session: false }), function (req, res) {
      res.send(req.user);
    });

    authRouter.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
      res.send("Hello");
    });

    authRouter.get('/play', passport.authenticate('jwt', { session: false }), function (req, res) {
      const query = req.query;
      const user = req.user;

      let data = {"id_viewer": user.id, "id_uploader": query.id_uploader};

      console.log("PLAY");
      console.log(data);

      service.cli.NODE_DB_CONTROLLER.act({role:"viewer", cmd:"add"}, data, console.log);

      res.send("OK done");
    });

    return router;
};
