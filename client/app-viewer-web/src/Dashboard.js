import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config'

let configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

class Dashboard extends Component {

  componentDidMount() {
    axios.get(`${config.API_URL_PREFIX}/auth/dashboard`, configAxios)
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
      <div className="Dashboard">
        <Hero />
      </div>
    );
  }
}

export default Dashboard;
