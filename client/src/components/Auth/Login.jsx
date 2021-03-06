import React, { Component } from 'react';
import axios from 'axios';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import Logo from '../globals/Logo';

import './Auth.css';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: ''
    }
  }


  submitAuthData = async (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const body = {
      email,
      password,
      username
    }
    try {
      const data = await axios.post(`${REST_SERVER_URL}/api/auth/login`, body);
      if (data.data.message) {
        return this.handleSignupError(data.data.message)
      } else if (data) {
        localStorage.setItem('email', data.data.email)
        localStorage.setItem('id', data.data.id)
        localStorage.setItem('token', data.data.token.accessToken)
        localStorage.setItem('username', data.data.username)
        this.props.history.push('/home')
      } else if (!data) {
        this.props.history.push('/login');
      }
    } catch (err) {
      err.message.slice(-3) 
        ? this.setState({errorMessage: "Username and/or Password are not valid. Please Try again!"})
        : console.error(err)
    }
  }

  handleSignupError = (error) => {
    let errMess = `oopsie doopsie... ${error[0]}`;
    this.setState({errorMessage: errMess})
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
      <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
          <Input
            name='email'
            type='email'
            placeholder={'enter email'}
            onChange={this.handleInputChange}
            />
          <Input 
            name='password'
            type='password'
            placeholder={'enter your password'}
            onChange={this.handleInputChange}
            />
          <Button
            backgroundColor="red"
            color="white"
            text="Log In"
            onClick={(e) => this.submitAuthData(e)}
            />
        </form>
        <div className="auth-error">{this.state.errorMessage}</div>
      </div>
    )
  }
}
