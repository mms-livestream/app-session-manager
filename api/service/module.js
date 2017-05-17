/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

//Dependencies

const Promise = require('bluebird');  //jshint ignore:line
const fs = Promise.promisifyAll(require('fs'));
const XMLParser = Promise.promisifyAll(require('xml2js'));

function extractTimeFromMPD(XMLFilePath) {
  return new Promise( (resolve, reject) => {
    fs.readFileAsync(XMLFilePath, 'utf8')
    .then((XMLData) => XMLParser.parseStringAsync(XMLData))
    .then((data) => {
      let initialTime = data['MPD']['$'].availabilityStartTime;
      console.log(initialTime);
      resolve(initialTime);
    })
    .catch((err) => {
      console.log(`Error on extractTimeFromMPD : ${err}`);
      reject(err);
    });
  });
};

function generateMPD(data, MPDFilePath, service) {
  return new Promise(function(resolve, reject) {
    service.cli.NODE_MPD_GENERATOR.act({role:"mpd", cmd:"generate"}, data, (err, res) => {
        fs.writeFileAsync(MPDFilePath, res.data)
        .then(() => console.log(`Generated MPD file for viewer: ${data.id_viewer}`))
        .catch((err) => console.log(`Error on writing mpd: ${err}`));
    });
  });
}

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
                    let MPDFilePath = `${config.DIR_ROOT}/data/mpd/${data.id_viewer}.mpd`;
                    console.log(MPDFilePath);
                    fs.statAsync(MPDFilePath)
                    //File exists : only need to update servers, not the time
                    .then((stat) => extractTimeFromMPD(MPDFilePath))
                    .then((initialTime) => {
                      data.initialTime = initialTime; //attach initial time to notify mpd generator
                      generateMPD(data, MPDFilePath, service);
                    })
                    .catch((err) => {
                      //File absent: generate it completely with a new initial time
                      if (err.code === 'ENOENT') {
                        generateMPD(data, MPDFilePath, service); //time not attached to
                      }

                      //Usual error catch
                      else {
                        console.log(`Error on file mpd: ${err}`);
                      }
                    })
                    /*
                    extractTimeFromMPD(MPDFilePath);
                    service.cli.NODE_MPD_GENERATOR.act({role:"mpd", cmd:"generate"}, data, (err, res) => {
                        fs.writeFile(MPDFilePath, res.data, function(err) {
                            if(err) {
                                return console.log(err);
                            }

                            console.log("done " + data.id_viewer);
                        });
                    });*/
                })(one);
            }
        })
        .then(() => {return new Promise( (resolve, reject) => {respond(null, { 'code': 200 , 'status': "Mpd generated succesfully" }); resolve();}, null );} )
        .catch(err => {
            respond(`Error on generating mpd: ${err}`, { 'code': 500 , 'status': null });
        });
    });

};
