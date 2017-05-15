import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config';


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleUsernameChange(e) {
      this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
      this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let credentials = {"username": this.state.username, "password": this.state.password };
    axios.post(`${config.API_URL_PREFIX}/login`, credentials)
    .then(res => {
      console.log(res.data);
      sessionStorage.setItem('token', res.data.token);
      window.location.replace('/dashboard');
    })
    .catch((err) => {
      console.log("Error" + err);
    });
  }

  render() {
    return (
      <form className="form-signin" method="post" action="/api/login" onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Please login</h2>
        <div className="form-group"><input type="text" name="username" className="form-control inputUsername" placeholder="Username" required autofocus value={this.state.username} onChange={this.handleUsernameChange}/> </div>
        <div className="form-group"><input type="password" name="password" className="form-control inputPassword" placeholder="Password" required value={this.state.password} onChange={this.handlePasswordChange} /></div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        <div className="checkbox">
          <label>
            <a href="/signup">Not Registered</a>
          </label>
        </div>
      </form>
    );
  }
}

const SignInContent = (
  <div className="container">
    <div className="row">
      <div id="login" className="col-xs-6 col-lg-8 center col-lg-offset-2 col-xs-offset-3">
        <SignInForm />
      </div>
    </div>
  </div>
);

class SignIn extends Component {
  render() {
    return (
      <div className="SignIn">
        <Hero insideHero={SignInContent} />
      </div>
    );
  }
}

export default SignIn;
