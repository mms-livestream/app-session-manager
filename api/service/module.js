/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

//Dependencies

const Promise = require('bluebird');  //jshint ignore:line
const fs = require('fs');

const config = require('../../config.js');

//API

module.exports = function (options) {

    let service = options.service;

    /**
     * Update mpd
     * @function
     */
    this.add('role:mpd,cmd:update', (msg, respond) => {
        let validation = new Promise((resolve, reject) => {
            //TODO
            resolve();
        });

        let pool = msg.data;
        console.log(pool);
        //msg.data = {"234": {"id_uploader": 34, "servers":{"serv1", "serv2", "serv3"} }};

        validation.then(() => {
            let one = {};
            for (let id_viewer in pool) {
                one = {"id_viewer": id_viewer, "id_uploader": pool[id_viewer].id_uploader, "servers": pool[id_viewer].servers};
                (function(data) {   //jshint ignore:line
                    service.cli.NODE_MPD_GENERATOR.act({role:"mpd", cmd:"generate"}, data, (err, res) => {
                        fs.writeFile(`${config.DIR_ROOT}/data/mpd/${data.id_viewer}.mpd`, res.data, function(err) {
                            if(err) {
                                return console.log(err);
                            }

                            console.log("done " + data.id_viewer);
                        });
                    });
                })(one);
            }
        })
        .then(() => {return new Promise( (resolve, reject) => {respond(null, { 'code': 200 , 'status': "Mpd generated succesfully" }); resolve();}, null );} )
        .catch(err => {
            respond(`Error on generating mpd: ${err}`, { 'code': 500 , 'status': null });
        });
    });

};
