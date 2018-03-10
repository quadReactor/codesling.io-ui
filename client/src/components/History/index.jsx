import React, { Component } from 'react';
import axios from 'axios';

import { HistoryList } from './HistoryList.jsx';
import EditorNavbar from '../Sling/EditorHeader';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

class History extends Component {
  constructor() {
    super();
  }
  state = { 
    history: []
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`${REST_SERVER_URL}/api/history/fetchAllHistory/${id}`);
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
