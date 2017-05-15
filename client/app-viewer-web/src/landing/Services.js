import React, { Component } from 'react';

class Services extends Component {
  render() {
    return (
      <section id="services">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading">At Your Service</h2>
                      <hr className="primary" />
                  </div>
              </div>
          </div>
          <div className="container">
              <div className="row">
                  <div className="col-lg-3 col-md-6 text-center">
                      <div className="service-box">
                          <i className="fa fa-4x fa-diamond text-primary sr-icons"></i>
                          <h3>Hight quality</h3>
                          <p className="text-muted">Hight quality streaming without interruptions </p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6 text-center">
                      <div className="service-box">
                          <i className="fa fa-4x fa-paper-plane text-primary sr-icons"></i>
                          <h3>Ready to Ship</h3>
                          <p className="text-muted">You can post all your videos live and receive live feedback from your most faithful viewers!</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6 text-center">
                      <div className="service-box">
                          <i className="fa fa-4x fa-newspaper-o text-primary sr-icons"></i>
                          <h3>Up to Date</h3>
                          <p className="text-muted">We update dependencies to keep things fresh.</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-6 text-center">
                      <div className="service-box">
                          <i className="fa fa-4x fa-heart text-primary sr-icons"></i>
                          <h3>Made with Love</h3>
                          <p className="text-muted">And all these services for free simply because we love it!</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

export default Services
