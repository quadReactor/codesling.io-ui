import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Sling from './Sling.jsx';

const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL;

class SlingIndex extends Component {
  state = { 
    socket: null,
   }

  componentWillMount() {
<<<<<<< HEAD
    this.socket = io(SOCKET_SERVER_URL, {
=======
    this.socket = io('http://localhost:4155', {
>>>>>>> 7d6401a881adba49317c5d74eb7ef52e4f18c1c7
      query: {
        roomId: this.props.location.pathname.slice(1)
      }
    });

    this.setState({ socket: this.socket });
  }

  render() {
    if (this.props.location.state) {
      return (
        <Sling socket={this.state.socket} challenge={this.props.location.state.challenge} history={this.props.history} />
      );
    } else {
      return (
        <Sling socket={this.state.socket} challenge={{}} history={this.props.history}/>
      );
    }
  }
}

export default SlingIndex;