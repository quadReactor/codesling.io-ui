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
      <li>Item 1</li>
      <li>Item 2</li>
      <li><a onClick={() => {window.localStorage.clear(); 
      this.props.history.push('/')
      }}> Logout </a></li>
    </ul>
  </nav>
    )
  }
}

export default EditorNavbar;
