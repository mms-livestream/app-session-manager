import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config'

let configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

class SignOut extends Component {

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.replace('/');
  }

  render() {
    return (
      <div className="SignOut">
        <Hero />
      </div>
    );
  }
}

export default SignOut;
