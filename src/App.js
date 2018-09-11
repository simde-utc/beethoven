import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './menu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <MenuBody></MenuBody>
      </div>
    );
  }
}

export default App;
