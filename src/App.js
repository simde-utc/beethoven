import React, { Component } from 'react';

import {connect} from 'react-redux'
import './App.css';
import Header from './header';
import MenuBody from './containers/Menu/menu';


import MenusToServe from './webTVs/menusdisplayer'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class App extends Component {


    render() {
      return (
      <Router>
        <div>
          <Route exact={true} path="/menus" render= {() => (
            <div className="App">
              <Header></Header>
              <div
                style={
                  {
                    position:'fixed',
                    top :'20px',
                    right:'10px',
                    width:'auto',
                    zIndex:'999',
                    borderRadius:'0px'
                  }
                }
                >{List}</div>
                <MenuBody></MenuBody>
                <CasConnection></CasConnection>
              </div>
            )}/>
            <Route exact={true} path="/webTV1" render= {() => (
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
