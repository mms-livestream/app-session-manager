import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <section className="bg-primary" id="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 text-center">
                      <h2 className="section-heading">We ve got what you need!</h2>
                      <hr className="light" />
                      <p className="text-faded">Use our live streaming video application and everything you need will finally be in your hands</p>
                      <a href="/aboutus" className="page-scroll btn btn-default btn-xl sr-button">About Us !</a>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

export default About
