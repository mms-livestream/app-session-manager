/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

//Dependencies

let Promise = require('bluebird');  //jshint ignore:line

let path = require('path');
let express = require('express');



let core = require('mms-core');
let serverAPI = require('./api/server/module.js');
let serviceAPI = require('./api/server/module.js');

//Class

class SessionManager {
    constructor() {
        this.node = "NODE_SESSION_MANAGER";
        this.service = new core.Service(this.node, serviceAPI);
        this.server = new core.Server(this.node, serverAPI, {"service": this.service});
    }
}

//Main

let manager = new SessionManager();

let promInteraction = manager.service.prepare()
    .then(() => manager.service.listen())
    .then(() => manager.server.listen());

//App public server
promInteraction.then(() => {
    manager.server.framework.use('/client/public', express.static('client/public'));  // serve public files
})
.then(() => {

    manager.server.framework.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/app/view/index.html'));
    });

    manager.server.framework.get('/video/:id', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/app/view/index.html'));
    });

});
