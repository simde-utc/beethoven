import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CasConnection from './config'
import Header from './header.js'
import {connect} from 'react-redux';

import { login } from "./Actions";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
      </div>
    );
  }
}

export default App;
