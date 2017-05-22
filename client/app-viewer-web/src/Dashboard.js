import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Hero from './Hero';
import Frame from './Frame';

import config from './config'

let configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

/*
const frameStyle = {
  background: '#FBF9F0',
  minHeight: '50vh',
  opacity: '0.9',
  borderRadius: '10px',
  boxShadow: '5px 5px 5px #888888',
  paddingBottom: '3vh',
  color: 'rgba(144, 55, 55, 0.82)'
};*/

const VideoElement = function(props) {

  let tagSet = [];
  props.tags.forEach((tag) => {
    tagSet.push( (<span className="label label-info">{tag}</span>) );
  })

  return (
    <div className="col-lg-4">
      <div className="panel-body">{props.title}</div>
      <a href={`/play?v=${props.id_video}`}><img src="images/test.png" className="img-thumbnail" /></a>
      <br />
        {tagSet}
    </div>
  );
}

/*
const Frame = function(props) {
  return (
      <div className="container">
           <div className="col-lg-8 col-lg-offset-2" style={frameStyle}>
             <h3 className="center">Live content</h3>
             {props.videoSet}
           </div>
      </div>
  );
}*/

//e.g data.videos = { "45": {"title":"videotitle", "tags":["test"]} }
function buildDashboard(data) {
  //Videos
  let videoSet = []
  for (let id_video in data.videos) {
    if (data.videos.hasOwnProperty(id_video)) {
      videoSet.push( (<VideoElement id_video={id_video} title={data.videos[id_video].title} tags={data.videos[id_video].tags} />) );
    }
  }

  return ( <Frame insideFrame={videoSet} title="Live Content" /> );
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {dashboard: {videos: { "1": {"title":"Test Video", "tags":["mms", "team", "demo"]} }}}
  }

  componentDidMount() {
    //Socketio
    let socket = this.props.app.socket;
    socket.on("connect", () => {
      console.log("Socketio connected");
      //socket.emit('client', {"client":"On Dashboard"});
    });
    socket.on("update-videos", (data) => {
      console.log(data);
      this.setState({ dashboard: update(this.state.dashboard, {videos: {$set: data}}) });
    });

    //Dashboard API
    axios.get(`${config.API_URL_PREFIX}/auth/dashboard`, configAxios)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      if (err.response.status === 401) { //Not Authorized, not logged
        window.location.replace('/signin');
      }
    })

    console.log(buildDashboard(this.state.dashboard));
  }

  render() {
    return (
      <div className="Dashboard">
        <Hero insideHero={buildDashboard(this.state.dashboard)} />
      </div>
    );
  }
}


export default Dashboard;
