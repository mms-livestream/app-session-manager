import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import axios from 'axios';

import NavBar from './NavBar';
import Footer from './Footer';

import NotFound from './NotFound';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import Play from './Play';
import AboutUs from './AboutUs';

import Test from './Test';

import config from './config';

//Socketio
const io = require('socket.io-client');
//const socket = io("http://192.168.2.132:8080");
const socket = io("http://localhost:8080");


const configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {id_user: "", username: ""}, socketio: {socket: socket}};
  }

  //TODO improve to Redux, dispatch from root?

  componentDidMount() {
    //Socketio
    socket.on("connect", () => {
      console.log("Socketio connected");
      this.setState({socketio: {socket: socket}});
      //sessionStorage.setItem('socket', JSON.stringify(socket)); //Fix for dashjs access from external file
    });


    //Logged : get user information
    axios.get(`${config.API_URL_PREFIX}/auth/connect`, configAxios)
    .then(res => {
      let user = {"id": res.data.id, "username": res.data.username};
      this.setState({user: user});
      sessionStorage.setItem('user', JSON.stringify(user)); //Fix for dashjs access from external file
    })
    .catch(err => {
      console.log(err); //even if not authorized ok
    })
  }

  transmit(Comp, data) {
    return (props) => <Comp app={data}/>
  }

  render() {
    return (
      <Router>
        <div>
          {<Route path='/' component={this.transmit(NavBar, {"user": this.state.user})} />}
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={this.transmit(Dashboard, {"socket": this.state.socketio.socket})} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signout' component={SignOut} />
          <Route exact path='/aboutus' component={AboutUs} />
          {/*<Route path='/play' component={this.transmit(Play, {"user": this.state.user, "socket": this.state.socketio.socket})} />*/}
          <Route path='/play' component={Play} />
          {<Route path='/' component={Footer} />}
        </div>
      </Router>
    );
  }
}

export default App;
