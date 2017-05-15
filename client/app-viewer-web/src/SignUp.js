import React, { Component } from 'react';
import axios from 'axios';

import Hero from './Hero';

import config from './config';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleUsernameChange(e) {
      this.setState({username: e.target.value});
  }

  handleEmailChange(e) {
      this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
      this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`${config.API_URL_PREFIX}/register`, {"username": this.state.username, "email": this.state.email, "password": this.state.password })
    .then(res => {
      console.log(res.data);
      window.location.replace("/signin")
    })
    .catch((err) => {
      console.log("Error" + err);
    });
  }

  render() {
    return (
      <form className="form-signin" method="post" action="/api/register" onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Please register</h2>
        <div className="form-group"> <input type="text" name="username" className="form-control inputUsername" placeholder="Username" required autofocus value={this.state.username} onChange={this.handleUsernameChange} /> </div>
        <div className="form-group"> <input type="email" name="email" className="form-control inputEmail" placeholder="Email address" required autofocus value={this.state.email} onChange={this.handleEmailChange} /> </div>
        <div className="form-group"> <input type="password" name="password" className="form-control inputPassword" placeholder="Password" required value={this.state.password} onChange={this.handlePasswordChange} /> </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>
    );
  }
}

const SignUpContent = (
  <div className="container">
    <div className="row">
      <div id="register" class="col-xs-6 col-lg-8 center col-lg-offset-2 col-xs-offset-3">
        <SignUpForm />
      </div>
    </div>
  </div>
);

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <Hero insideHero={SignUpContent} />
      </div>
    );
  }
}

export default SignUp;
