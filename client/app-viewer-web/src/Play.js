import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config'

let configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

const LivePlayer = (

  <div id="live-player">
    <div id="videocontainer" style={{size: '100%'}}>
      <video id="videoplayer" controls="true"></video>
    </div>
  </div>

);
/*<div className="embed-responsive embed-responsive-16by9" >*/
/*</div>*/

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {IDVideo: null};
  }

  componentDidMount() {
    //validation and extraction
    let URLSlices = window.location.search.split("=");
    if (URLSlices[0] === "?v" && !isNaN(URLSlices[1])) {  //validation: check if is a number
      this.setState({IDVideo: URLSlices[1]}, this.requestVideo);
    }
    else {
      window.location.replace('/dashboard');
    }
  }

  requestVideo() {
    configAxios.params = {"id_uploader": this.state.IDVideo};   //query on server side
    axios.get(`${config.API_URL_PREFIX}/auth/play`, configAxios)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      if (err.response.status === 401) { //Not Authorized, not logged
        window.location.replace('/signin');
      }
    })
  }

  render() {
    return (
      <div className="Play">
        <Hero insideHero={LivePlayer} />
      </div>
    );
  }
}

export default Play;
