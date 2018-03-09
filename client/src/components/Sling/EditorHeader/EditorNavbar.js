import React, { Component } from 'react';
import Button from '../../globals/Button';
// const EditorNavbar = () => (
//   <nav className="editor-navbar">
//     <ul>
//       <li>Item 1</li>
//       <li>Item 2</li>
//       <li>Item 3</li>
//     </ul>
//   </nav>
// );

class EditorNavbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav className="editor-navbar">
    <ul>
      <li><a onClick={() => { this.props.history.push(`/home`)
      }} > Home</a></li>
      {/* <li><a onClick={() => { 
        this.props.history.push(`${this.props.history.location.pathname}`)
      }} > Back To Dual </a></li> */}
      <li><a onClick={() => { 
       this.props.history.push('/friend')
       console.log(window.localStorage)
       console.log("click takes you to friend component to chat with them to send dual link, click back to dual to go back to live Dual");
      }} > Friends </a></li>
      <li><a onClick={() => { this.props.history.push('/history')
      }} >History</a></li>
      <li><a onClick={() => {window.localStorage.clear(); 
      this.props.history.push('/')
      }}> Logout </a></li>
    </ul>
  </nav>
    )
  }
}

export default EditorNavbar;
