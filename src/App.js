import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Vente from './vente';
import CasConnection from './config'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <CasConnection></CasConnection>
      </div>
    );
  }
}

export default App;
