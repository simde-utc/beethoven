import React, { Component } from 'react';

import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './containers/Menu/menu';


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
