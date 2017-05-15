import React, { Component } from 'react';

import Hero from './Hero'

const NotFoundHeading = (
    <div className="header-content-inner">
      <h1> 404 </h1>
      <hr />
      <h1> Not Found </h1>
    </div>
);


class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Hero insideHero={NotFoundHeading} />
      </div>
    );
  }
}

export default NotFound;
