/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

//Dependencies

let Promise = require('bluebird');  //jshint ignore:line

let path = require('path');
let express = require('express');

let core = require('mms-core');
let serverAPI = require('./api/server/module.js');
let serviceAPI = require('./api/service/module.js');

//Class

class SessionManager {
    constructor() {
        this.node = "NODE_SESSION_MANAGER";
        this.service = new core.Service(this.node, serviceAPI, {"prepare": true});
        this.server = new core.Server(this.node, serverAPI, {"service": this.service});
    }
}

//Main

let manager = new SessionManager();

let promInteraction = manager.service.listen()
    .then(() => manager.server.listen());

//App public server
promInteraction.then(() => {
    manager.server.framework.use(express.static('client/public'));  // serve public files
})
.then(() => {

    let homeRouter = express.Router();

    manager.server.framework.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/temp/index.html'));
    });

    manager.server.framework.get("/signin", function(req, res) {
        res.sendFile(path.join(__dirname, 'client/temp/signin.html'));
    });

    //Home Router

    manager.server.framework.use("/home", homeRouter);

    homeRouter.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/home.html"));
    });

    homeRouter.get("/play", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/play.html"));
    });

    homeRouter.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/about.html"));
    });

    homeRouter.get("/favorites", function(req, res) {
        res.sendFile(path.join(__dirname + "client/temp/favoris.html"));
    });

    homeRouter.get("/logout", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/index.html"));
    });

    homeRouter.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/profile.html"));
    });

    /*
    manager.server.framework.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/contact.html"));
    });*/

});
