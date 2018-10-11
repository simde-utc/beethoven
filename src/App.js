import React, { Component } from 'react';

import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './containers/Menu/menu';
import CasConnection from './config';

import {printError} from './Utils/utils'
import {deleteError} from './actions'

import BadgeConnexion from './Utils/badgeConnexion'
import WebSocketConnexion from './Utils/websocket'

class App extends Component {


    render() {
      const {errorsList, connected, badgeuse} = this.props;
      const {deleteError} = this.props;

      //affichage de l'ensemble des erreurs du programme
      let ListErrors = []
      if(errorsList.length > 0)
      {
        errorsList.forEach((element)=>{
          ListErrors.push(printError(element))
        })
      }

      return (
        <div className="App">

            <WebSocketConnexion></WebSocketConnexion>
            {badgeuse===true && connected===false &&<BadgeConnexion></BadgeConnexion>}
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
            >{ListErrors}</div>
          <MenuBody></MenuBody>
          <CasConnection></CasConnection>
        </div>
      );
    }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    errorsList : state.errors.errorsList || [],
    connected : state.utils.connected || false,
    badgeuse : state.utils.badgeuse || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    deleteError : ()=> dispatch(deleteError())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);
