import React, { Component } from "react";
import axios from "axios";
import Input from "../globals/forms/Input";
import Button from "../globals/Button";
import { FriendList } from "./FriendList.jsx";

import EditorNavbar from "../Sling/EditorHeader";

class Friend extends Component {
  state = {
    friends: [],
    check: false
  };

  fetchFriends = async () => {
    const id = localStorage.getItem("id");
    const { data } = await axios.get(
      `http://localhost:3396/api/friends/fetchAllFriends/${id}`
    );
    this.setState({ friends: data });
  }
  
  addFriend = async () => {
    const user = this.state.name;
    const { data } = await axios.get(
      `http://localhost:3396/api/users/fetchSearchUser/${user}`
    );
    if (!data.rows[0]) {
      await this.setState({ check: true });
    } else {
      await axios.post(`http://localhost:3396/api/friends/addFriend`, {
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
    const {data} = await axios.delete(`http://localhost:3396/api/friends/deleteFriend/${userId}/${friendId}`);
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
          
        </div>
      </div>
    );
  }
}

export default Friend;
