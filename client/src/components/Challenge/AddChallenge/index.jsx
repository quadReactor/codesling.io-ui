import React, { Component } from 'react';
import axios from 'axios';
import CodeMirror from 'react-codemirror2';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

<<<<<<< HEAD
import EditorNavbar from '../../Sling/EditorHeader';
=======
import 'codemirror/mode/javascript/javascript.js';


>>>>>>> More auth fixes
class AddChallenge extends Component {
  constructor() {
    super();
  }
  state = { 
    title: '',
    content: '',
    difficulty: null,
    testCase: '',
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0
    }
    const result = await axios.post('http://localhost:3396/api/challenges', body);
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <EditorNavbar history={this.props.history} />
        <form className="auth-form">
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='description'
            type='description'
            placeholder={'enter description'}
            onChange={this.handleChallengeInput}
            />
          <div className="challenge-creator-container">
            <CodeMirror 
              editorDidMount={this.initializeEditor}
              value={this.state.challengerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
              }}
            />
          </div>
          <div className="challenge-creator-container">
            <CodeMirror 
              id="code"
              editorDidMount={this.initializeEditor}
              value={this.state.challengerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddChallenge;
