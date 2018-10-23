import React, { Component } from 'react';

import {connect} from 'react-redux'
import './App.css';
import Header from './header';
import MenuBody from './containers/Menu/menu';


import MenusToServe from './containers/webTVs/menusdisplayer'
import PicBar from './containers/PicBar/picBar'
import PicSalle from './containers/PicSalle/picSalle'
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
                <PicBar></PicBar>

              </div>
            )}/>

          <Route exact={true} path="/picSalle" render= {() => (
              <div className="App">
                <PicSalle></PicSalle>

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
