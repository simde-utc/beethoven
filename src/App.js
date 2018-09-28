import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './Menu/menu';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors : null
    }
  }
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
