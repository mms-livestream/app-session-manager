import React, { Component } from 'react';

import NavBar from './NavBar';
import Hero from './Hero';
import About from './landing/About';
import Services from './landing/Services';
import Aside from './landing/Aside';

const headingStyle = {
  backgroundColor: 'transparent',
  border:'1px',
  marginTop: '100px'
}

const LogoHeading = (
    <div className="header-content-inner">
      <img id="heading" src="/images/logo_trans.png" className="img-thumbnail" style={headingStyle}/>
      <hr />
      <p id="police">Your high quality live video app as you ve never seen it before !</p>
      <a href="/signin" className="btn btn-primary btn-xl page-scroll">Sign In</a>
    </div>
);

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Hero insideHero={LogoHeading} />
        <About />
        <Services />
        <Aside />
      </div>
    );
  }
}

export default Landing;
