import React from "react";
import Button from "../globals/Button";

export const FriendList = ({ friends, removeFriend }) => {
  return (
    <div>
      
      {friends.map((friend, index) => {
      return (
      <li key={index}>
        <div>{friend.username}</div>
        <Button
            backgroundColor="red"
            color="white"
            text="Delete"
            onClick={() => removeFriend(friend.id)}
          />
      </li>
      )
       })
        } 
    </div>
  );
};
