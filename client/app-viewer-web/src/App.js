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

import config from './config';

const configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {logged: false}};
  }

  //TODO improve to Redux, dispatch from root?

  componentDidMount() {
    //Logged : get user information
    axios.get(`${config.API_URL_PREFIX}/auth/connect`, configAxios)
    .then(res => {
      this.setState({user: {"logged": true, "username": res.data.username}});
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
          <Route path='/' component={this.transmit(NavBar, {"user": this.state.user})} />
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signout' component={SignOut} />
          <Route path='/play' component={Play} />
          <Route path='/' component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
