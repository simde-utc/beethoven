import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Vente from './vente';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Vente></Vente>
      </div>
    );
  }
}

export default App;
