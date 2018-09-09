import React, { Component } from 'react';
import './App.css';
import AdminBody from './admin';
import './index.css';

class Body extends Component {
  render() {
    return (
      <div className="Body">
        <AdminBody></AdminBody>
      </div>
    );
  }
}

export default Body;
