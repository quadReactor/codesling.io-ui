import React, { Component } from 'react';
import axios from 'axios';
import "./chat.css"


class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: ["Welcome to the ChatRoom"],
      text: ""
     }
  }
  
  componentDidMount() {
    const { socket } = this.props;
    
    socket.on('server.chat', ( newMessage ) => {
      console.log(newMessage)
      var temp = newMessage.message
      this.setState({ messages: [...this.state.messages, temp]});
      
    });
  }

  submit() {
    
    const { socket } = this.props
    let wholeMessage = `${localStorage.username}: ${this.state.text}`
    socket.emit('client.Chat',  {message: wholeMessage } )

  }

  changeText(e){
    this.setState({text: e.target.value})
  }


  render() {

    let {messages} = this.state

    return (
      <div>
        <div className="chat-message">
          {messages.map( (message) => 
            <div> {message} </div>
          )}
        </div>
        <input type="text/css" onChange={ (e) => this.changeText(e)}/>
        <input type="button" value="enter" onClick={()=> this.submit()} />
      </div>
    );
  }
}

export default Chat;

