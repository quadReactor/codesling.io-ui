import React, { Component } from "react";
import axios from "axios";
import Input from "../globals/forms/Input";
import Button from "../globals/Button";
import { FriendList } from "./FriendList.jsx";

import io from 'socket.io-client/dist/socket.io.js';
import Chat from '../Chat/index.jsx'
import EditorNavbar from "../Sling/EditorHeader";
const { SOCKET_SERVER_URL } = process.env;
const { REST_SERVER_URL } = process.env;
class Friend extends Component {
  state = {
    friends: [],
    check: false,
    socket: null,
    room: '',
    chat: false, //render only chat if you open chat with friend
  };

  componentWillMount () {
    //this is the handshake
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        //roomId cahnge it to what i want must be string removes / with slice 
        roomId: this.state.room
      }
    });

    this.setState({ socket: this.socket });
  }

  roomId = (user, friend) => {
    //when user clicks chat button it sets up room id for socket
      // create button next for chatting in fron ot friend
    //takes user user_id and friend user_id
    //Sort return String
    //exampke userId = 1 friendId = 2
    //return 'chatroom12"
    //set state room to this id
  }

  fetchFriends = async () => {
    const id = localStorage.getItem("id");
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/fetchAllFriends/${id}`
    );
    this.setState({ friends: data });

    //fetch by user and friend id to make sure there arnt repeate combinations of friends
  }
  
  addFriend = async (e) => {
    //need logic to not add friend only add if not already friend
    //current logic is like following people
    e.preventDefault()
    const user = this.state.name;
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/users/fetchSearchUser/${user}`
    );
    if (!data.rows[0]) {
      await this.setState({ check: true });
    } else {
      await axios.post(`${REST_SERVER_URL}/api/friends/addFriend`, {
        user_id: window.localStorage.id,
        friend_id: data.rows[0].id
      });
      await this.setState({
        search: ""
      });
    }
    this.fetchFriends();

  };

  removeFriend = async (friend) => {
    const userId = localStorage.getItem("id");
    const friendId = friend;
    const {data} = await axios.delete(`${REST_SERVER_URL}/api/friends/deleteFriend/${userId}/${friendId}`);
    this.fetchFriends();
  };

  componentDidMount() {
    this.fetchFriends();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <EditorNavbar history={this.props.history} />
        <form>
          <Input
            type="text"
            placeholder="Search For Your Friend"
            name="name"
            onChange={this.handleChange}
          />

          {this.state.check ? <div>NO USER FOUND</div> : null}
          <Button
            backgroundColor="red"
            color="white"
            text="Submit"
            onClick={this.addFriend}
          />
        </form>
        <div>
          <h3>Friends</h3>
          <FriendList friends={this.state.friends} removeFriend={this.removeFriend} />
        </div>
        <div>
          <h3>Messages</h3>
          <h4>hi</h4>
          <Chat socket={this.state.socket} />
        </div>
      </div>
    );
  }
}

export default Friend;
