import React, { Component } from 'react';
import axios from 'axios';
import "./chat.css"
import Input from "../globals/forms/Input";
import Button from "../globals/Button";

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
    socket.emit('client.chat',  {message: wholeMessage } )

  }

  changeText(e){
    this.setState({text: e.target.value})
  }


  render() {

    let {messages} = this.state

    return (
      <div>
        <div className="chat-message">
          {messages.map( (message, index) => 
            <div key={index}> {message} </div>
          )}
        </div>
        
        <Input type="text/css" placeholder="Message Here" onChange={ (e) => this.changeText(e)}/>
        <Button backgroundColor="red" color="white" text="Submit" onClick={()=> this.submit()} />
        
      </div>
    );
  }
}

export default Chat;

