import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Hero from './Hero';
import Frame from './Frame';

import config from './config';

const io = require('socket.io-client');
const socket = io("http://localhost:8080");

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
/*
const ChatBox = function(props) {
  let messageSet = [];
  props.messages.forEach((msg) => {
    messageSet.push( (<li> {msg.username}: {msg.text} </li>) );
  })

  return (
      <div className="panel panel-primary">
        <div className="panel-heading" id="accordion">
          <span className="glyphicon glyphicon-comment"></span> Chat
          <div className="btn-group pull-right">
            <a type="button" className="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span className="glyphicon glyphicon-chevron-down"></span></a>
          </div>
        </div>
        <div className="panel-collapse collapse" id="collapseOne">
          <div className="panel-body">
            <ul id="messages" className="chat" style={{"listStyle": "none", "margin": 0, "padding": 0}}>
              {messageSet}
            </ul>
          </div>
          <div className="panel-footer">
            <div className="input-group" id="bottomChat">
              <form action="">
                <input id="m" autocomplete="off" type="text" className="form-control input-sm" placeholder="Type your message here..." /><span className="input-group-btn"><button className="btn btn-warning btn-sm" id="btn-chat">Send</button></span>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}*/

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {newMsg: ""};
    this.handleNewMsgChange = this.handleNewMsgChange.bind(this);
    this.handleNewMsgClick = this.handleNewMsgClick.bind(this);
  }

  handleNewMsgChange(e) {
      this.setState({newMsg: e.target.value});
  }

  handleNewMsgClick(e) {
    e.preventDefault();
    this.sendNewMsg();
  }

  sendNewMsg() {
    this.props.socket.emit("send-msg", {username: this.props.user.username, text: this.state.newMsg});
  }

  render() {
    //Messages
    let messageSet = [];
    this.props.messages.forEach((msg) => {
      messageSet.push( (<li> {msg.username}: {msg.text} </li>) );
    })

    return (
        <div className="panel panel-primary">
          <div className="panel-heading" id="accordion">
            <span className="glyphicon glyphicon-comment"></span> Chat
            <div className="btn-group pull-right">
              <a type="button" className="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span className="glyphicon glyphicon-chevron-down"></span></a>
            </div>
          </div>
          <div className="panel-collapse collapse" id="collapseOne">
            <div className="panel-body">
              <ul id="messages" className="chat" style={{"listStyle": "none", "margin": 0, "padding": 0}}>
                {messageSet}
              </ul>
            </div>
            <div className="panel-footer">
              <div className="input-group" id="bottomChat">
                <form action="">
                  <input id="m" autocomplete="off" type="text" className="form-control input-sm" value={this.state.newMsg} onChange={this.handleNewMsgChange} placeholder="Type your message here..." /><span className="input-group-btn"><button className="btn btn-warning btn-sm" id="btn-chat" onClick={this.handleNewMsgClick}>Send</button></span>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

/*
const InsideFrame = function(props) {
  return (
    <div className="container">
      <div className="row">
          <div className="col-lg-4" id="chatBox">
            <ChatBox messages={props.messages} socket={props.socket} user={props.user} />
          </div>
          <div className="col-lg-5">
            <h2>Video</h2>
            {LivePlayer}
          </div>
      </div>
    </div>
  );
}*/

const InsideFrame = function(props) {
  return (
    <div className="container">
      <div className="row">
          <div className="col-lg-9">
            {LivePlayer}
          </div>
      </div>
    </div>
  );
}

class Play extends Component {
  constructor(props) {
    super(props);
    //this.state = {IDVideo: null, messages: [], socket: this.props.app.socket};
    this.state = {IDVideo: null, messages: [], user: sessionStorage.getItem("user"), socket: socket};
    //[{text: "Bonjour lwiip"}, {text: "C'est eric"}]
  }

  componentDidMount() {
    //console.log(this.props.app.socket);
    //console.log(this.props.app.user);

    //Socketio
    this.state.socket.on("connect", () => {
      console.log("Socketio connected");
    });

    this.state.socket.on("update-chat", (msg) => {
      console.log(msg);
      this.setState({messages: update(this.state.messages, {$push: [msg] }) }, function() {
        console.log(this.state);
      });
    });

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
        <Hero insideHero={<Frame insideFrame={<InsideFrame messages={this.state.messages} socket={this.state.socket} user={this.state.user} />} title="Play" />} />
      </div>

    );
  }
}


/*

<div className="Play">
  <Hero insideHero={LivePlayer} />
</div>

*/

export default Play;
