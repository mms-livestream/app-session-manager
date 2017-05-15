import React, { Component } from 'react';
//import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {logBox: {}};
  }

  //TODO black navbar when logged in : Dashboard, Demo, Menu Dropdown -> Favorites, History, --, MyNameDropdown -> Preferences, Signout
  getLogBox() {
    if(this.props.app.user.logged) {
      return (
        <li className="dropdown">
          {/* TODO DROPDOWN */}
          <a id="police" className="dropdown-toggle" data-toggle="dropdown">{this.props.app.user.username}</a>
          <span className="caret"></span>
          <ul className="dropdown-menu">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/signout">Signout</a></li>
          </ul>
        </li>
      );
    }
    else {
      return (<li><a id="police" className="page-scroll" href="/signin">Signin</a></li>);
    }
  }

  render() {
    return (
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
              {/*  Brand and toggle get grouped for better mobile display  */}
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                  </button>
                  <a id="police" className="navbar-brand page-scroll" href="/">MMS</a>
              </div>

              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <li>
                          <a id="police" className="page-scroll" href="#about">About</a>
                      </li>
                      <li>
                          <a id="police" className="page-scroll" href="#services">Services</a>
                      </li>
                      <li>
                          <a id="police" className="page-scroll" href="#contact">Contact</a>
                      </li>
                      {this.getLogBox()}
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
}

export default NavBar;
