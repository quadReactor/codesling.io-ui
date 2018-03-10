import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import AddChallenge from './AddChallenge/index.jsx';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

class Challenge extends Component {
  state = {
    challenges: []
   }
  
  componentDidMount() {
    this.fetchAllChallenges();
  }

  fetchAllChallenges = async () => {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${REST_SERVER_URL}/api/usersChallenges/${id}`)
    this.setState({ challenges: data.rows });
  }

  challenges

  render() {
    return (
      <div>
        {this.state.challenges.map(challenge => {
          return (
            <div>
              <li>content: {challenge.content} </li>
              <li>difficulty: {challenge.difficulty} </li>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Challenge;

{/* <Switch>
  <Route path='/addChallenge' component={AddChallenge} />
</ Switch>    */}