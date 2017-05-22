import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Hero from './Hero';
import Frame from './Frame';

import config from './config';


class Test extends Component {

  render() {
    return (

      <div id="live-player">
        <div id="videocontainer" style={{size: '100%'}}>
          <video id="videoplayer" controls="true"></video>
        </div>
      </div>

    );
  }
}




export default Test;
