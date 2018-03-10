import React, { Component } from 'react';
import axios from 'axios';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import Logo from '../globals/Logo';

import './Auth.css';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: '',
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
      const data = await axios.post(`${REST_SERVER_URL}/api/auth/signup`, body);
      if (data.data.message) {
        return this.handleSignupError(data.data.message)
      } else if (data) {
        this.props.history.push('/login')
      } else if (!data) {
        this.props.history.push('/auth');
      }
    } catch (err) { 
      console.error(err)
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
            name='username'
            type='username'
            placeholder={'enter your username'}
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
            text="Sign Up"
            onClick={(e) => this.submitAuthData(e)}
            />
        </form>
        <div>
        <div className="auth-error">{this.state.errorMessage}</div>
        </div>
      </div>
    )
  }
}
