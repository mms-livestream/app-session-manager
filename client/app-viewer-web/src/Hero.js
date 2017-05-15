import React, { Component } from 'react';

const heroStyle = {
    backgroundImage: 'url("/images/Network.png")',
    minHeight: '100vh'
}

class Hero extends Component {
  render() {
    return (
      <header id="hero" style={heroStyle}>
        <div className="header-content">
            {this.props.insideHero}
        </div>
      </header>
    );
  }
}

export default Hero;
