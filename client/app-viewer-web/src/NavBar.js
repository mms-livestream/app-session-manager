import React, { Component } from 'react';
//import './NavBar.css';

function isInArray(element, array) {
  return (array.indexOf(element) > -1);
}

const logoStyle = {
  maxHeight: "100%"
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {publicURLs: ["/", "/signin", "/signup"]};
  }

  //TODO black navbar when logged in : Dashboard, Demo, Menu Dropdown -> Favorites, History, --, MyNameDropdown -> Preferences, Signout
  getLogBox() {
    let user = this.props.app.user;

    if(user && user.username) {
      return (
        <li className="dropdown">
          {/* TODO DROPDOWN */}
          <a id="police" className="dropdown-toggle" data-toggle="dropdown">{user.username} <span className="caret"></span> </a>
          <ul className="dropdown-menu">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/preferences">Preferences</a></li>
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
    let user = this.props.app.user;
    let URLPath = window.location.pathname;

    if (isInArray(URLPath, this.state.publicURLs)) {
      return (
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                {/*  Brand and toggle get grouped for better mobile display  */}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                    </button>
                    <a href="/" className="navbar-brand page-scroll"><img src="/images/logo.png" style={logoStyle}/></a>
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

    else {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
         <div className="container-fluid">
           <div className="navbar-header">
            <a href="/" className="navbar-brand"><img src="/images/logo.png" style={logoStyle}/></a> 
           </div>
           <ul className="nav navbar-nav">
             <li className=""><a href="/">Dashboard</a></li>
           </ul>
           <ul className="nav navbar-nav navbar-right">
             <li className=""><a href="/">My Favorites</a></li>
             <li className=""><a href="/">History</a></li>
             <li className="dropdown">
               <a className="dropdown-toggle" data-toggle="dropdown" href="#">Others
               <span className="caret"></span></a>
               <ul className="dropdown-menu">
                 <li><a href="/favorites">Feature 1</a></li>
                 <li><a href="/history">Feature 2</a></li>
               </ul>
             </li>
             <li className="dropdown">
             <a className="dropdown-toggle" data-toggle="dropdown">{user.username} <span className="caret"></span> </a>
             <ul className="dropdown-menu">
               <li><a href="/dashboard">Dashboard</a></li>
               <li><a href="/preferences">Preferences</a></li>
               <li><a href="/signout">Signout</a></li>
             </ul>
             </li>
           </ul>
         </div>
       </nav>
      );
    }

  }
}

export default NavBar;
