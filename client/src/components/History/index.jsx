import React, { Component } from 'react';
import axios from 'axios';

import { HistoryList } from './HistoryList.jsx';

import EditorNavbar from '../Sling/EditorHeader';
class History extends Component {
  constructor() {
    super();
  }
  state = { 
    history: []
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`http://localhost:3396/api/history/fetchAllHistory/${id}`);
    this.setState({ history: data });
  }
  
  render() {
    return (
      <div>
        <EditorNavbar history={this.props.history} />
        <HistoryList history={this.state.history}/>
      </div>
    );
  }
}

export default History;
