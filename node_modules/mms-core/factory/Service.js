/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

let Promise = require('bluebird');  //jshint ignore:line

let seneca = require('seneca');

let dConfig = require('../dConfig.js');
let Interaction = require('./Interaction.js');

class Service extends Interaction {
    constructor(node, api, options) {
        super(node, seneca(), api);

        //TEMP
        this.client = this.framework.client();  //seneca client to act upon other service nodes

        //NEW
        this.cli = {};

        if (options && options.prepare) {
            this.prepare();
            options.service = this;
        }

        this.framework.use(this.api, options);  //options to pass to seneca plugin
    }

    prepare() {
        return new Promise((resolve, reject) => {
            //Discover IPs related to this node : [{"host": string, "port": int }]
            let schema = dConfig.SERVICE_SCHEMA[this.node];          //TODO etcd, here hardcoded

            //TEMP
            for(let socket of schema) {
                this.framework.client(socket.service.port, socket.service.host);    //client discovers node     //TODO verify for several
            }

            //NEW
            for (let socket of schema) {
                this.cli[socket.name] = seneca().client(socket.service.port, socket.service.host);  //Attention new instance
            }

            resolve();
        });
    }

    listen() {
        return new Promise((resolve, reject) => {
            let config = dConfig[this.node].service;    //TODO etcd, here hardcoded

            this.framework
                .listen(config);
            console.log(`API Seneca Listening on: ${config.port}`);
            resolve();
        });
    }
}

module.exports = Service;
