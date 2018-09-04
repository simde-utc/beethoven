import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Body></Body>
      </div>
    );
  }
}

export default App;
