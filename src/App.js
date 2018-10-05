import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './containers/Menu/menu';
import CasConnection from './config';

class App extends Component {
    render() {
      return (
        <div className="App">
          <Header></Header>
          <MenuBody></MenuBody>
          <CasConnection></CasConnection>
        </div>
      );
    }
}

export default App;
