import React, { Component } from 'react';

import {connect} from 'react-redux'
import './App.css';
import Header from './header';
import MenuBody from './containers/Menu/menu';


import MenusToServe from './containers/NextMenus/menusdisplayer'
import WebTV from './containers/WebTV/webTV'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class App extends Component {


    render() {
      return (

      <Router>
        <div>
          <Route exact={true} path="/" render= {() => (
            <div className="App">
              <Header></Header>

              </div>
            )}/>
          <Route exact={true} path="/picBar" render= {() => (
              <div className="App">
                <WebTV tv='2'></WebTV>

              </div>
            )}/>
          <Route exact={true} path="/picSalle" render= {() => (
              <div className="App">
                <WebTV tv='1'></WebTV>

              </div>
            )}/>
          <Route exact={true} path="/NextMenus" render= {() => (
                <div className="App">
                  <MenusToServe></MenusToServe>
                </div>
              )}/>
          </div>
        </Router>
      );
    }
}

export default App;
