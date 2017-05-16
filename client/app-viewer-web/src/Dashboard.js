import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config'

let configAxios = {
  headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
};

const boxStyle = {
  background: '#FBF9F0',
  minHeight: '50vh',
  opacity: '0.9',
  borderRadius: '10px',
  boxShadow: '5px 5px 5px #888888',
  paddingBottom: '3vh',
  color: 'rgba(144, 55, 55, 0.82)'
};

const box = (
    <div className="container">
         <div className="col-lg-8 col-lg-offset-2" style={boxStyle}>
           <h3 className="center"> Live content</h3>
           <div className="col-lg-4">
             <img src="images/test.png" className="img-thumbnail" />
             <div className="panel-body"> Video title</div>
             <span className="label label-info">Music</span>
             <span className="label label-info">Live</span>
           </div>
         </div>
    </div>
);


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
        <Hero insideHero={box} />
      </div>
    );
  }
}

export default Dashboard;
