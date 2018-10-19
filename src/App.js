import React, { Component } from 'react';

import {connect} from 'react-redux'
import './App.css';
import Header from './header';
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
