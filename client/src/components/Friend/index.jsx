import React, { Component } from "react";
import axios from "axios";
import Input from "../globals/forms/Input";
import Button from "../globals/Button";
import { FriendList } from "./FriendList.jsx";

import EditorNavbar from "../Sling/EditorHeader";

class Friend extends Component {
  state = {
    friends: []
  };

  addFriend = async () => {
    const user = this.state.name
    const { data } = await axios.get(`http://localhost:3396/api/users/fetchSearchUser/${user}`)
    console.log(data)
    // e.preventDefault();
    // axios.get(`http://localhost:3396/api/addFriend`);
    // this.setState({
    //   search : ''
    // })
  }

  removeFriend = () => {
    const userId = 1;
    const friendId = 2;
    // axios.get(`http://localhost:3396/api/deleteFriend/${id}/${friendId},`);
  }

  async componentDidMount() {
    // const id = localStorage.getItem("id");
    // const { data } = await axios.get(
    //   `http://localhost:3396/api/fetchAllFriends/${id}`
    // );
    // this.setState({ friends: data });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state[name]));
  }

  render() {
    return (
      <div>
        <EditorNavbar history={this.props.history} />

        <h3>Friends</h3>

        <label>
          Search For Friend:
          <Input
            type="text"
            placeholder="Search For Your Friend"
            name="name"
            onChange={this.handleChange}
       
          />
        </label>

        <Button
          backgroundColor="red"
          color="white"
          text="Submit"
          onClick={this.addFriend}
        />

        <FriendList friend={this.state.friend} />
      </div>
    );
  }
}

export default Friend;
