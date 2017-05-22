/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

//Dependencies

let Promise = require('bluebird');  //jshint ignore:line

let path = require('path');
let express = require('express');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const socketio = require('socket.io');

let core = require('mms-core');
let serverAPI = require('./api/server/module.js');
let serviceAPI = require('./api/service/module.js');



//Class

class SessionManager {
    constructor() {
        this.node = "NODE_SESSION_MANAGER";
        this.socketio = {io: null};
        this.service = new core.Service(this.node, serviceAPI, {"prepare": true, "socketio": this.socketio});
        this.server = new core.Server(this.node, serverAPI, {"service": this.service, "socketio": this.socketio});
    }
}

//Main

let manager = new SessionManager();

let promInteraction = manager.service.listen()
    .then(() => manager.server.listen())
    .then((listeningServer) => {
      manager.socketio.io = socketio(listeningServer);    //hack : socketio initialized after all the core, by reference
      manager.socketio.io.on('connection', (socket) => {
        console.log('User connected');
        manager.socketio.socket = socket;
        eventEmitter.emit('socketio-user');
      });
    });

//App public server
promInteraction.then(() => {
    manager.server.framework.use(express.static('client/app-viewer-web/build/'));  // serve public files
    //manager.server.framework.use(express.static('client/app-viewer-web/public/'));  //TEMP
})
.then(() => {

    let homeRouter = express.Router();


  /*  manager.server.framework.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/app-viewer-web/build/index.html'));
    });*/


    manager.server.framework.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/temp/index.html'));
    });

    /*
    manager.server.framework.get("/signin", function(req, res) {
        res.sendFile(path.join(__dirname, 'client/temp/signin.html'));
    });

    manager.server.framework.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/contact.html"));
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
        res.sendFile(path.join(__dirname, "client/temp/favoris.html"));
    });

    homeRouter.get("/logout", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/index.html"));
    });

    homeRouter.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "client/temp/profile.html"));
    });

    homeRouter.get("/live", function(req, res) {
        //let tempID = ;
        //manager.service.cli.NODE_DB_CONTROLLER.act({role:"viewers", cmd:"add"}, data, console.log);
        res.status(200).sendFile(path.join(__dirname, "client/temp/live.html"));
    });*/

    manager.server.framework.get("/test", function(req, res) {
        res.status(200).sendFile(path.join(__dirname, "test.html"));
    });

    manager.server.framework.get("/dash", function(req, res) {
        res.status(200).sendFile(path.join(__dirname, "dash.all.min.js"));
    });

    manager.server.framework.get("/jquery", function(req, res) {
        res.status(200).sendFile(path.join(__dirname, "jquery.min.js"));
    });

    //Socketio Rules
    eventEmitter.addListener('socketio-user', () => {
      manager.socketio.socket.on("send-msg", (msg) => {
        console.log("OK received");
        console.log(msg);
        manager.socketio.socket.emit("update-chat", msg);
      })
    });

});
