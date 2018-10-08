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

class App extends Component {
    render() {
      const {errorsList} = this.props;
      const {deleteError} = this.props

      let List = []
      if(errorsList !== null){
        List.push(printError(errorsList))
        console.log(List)
      }
      return (
        <div className="App">
          <Header></Header>
          <div>{List}</div>
          <MenuBody></MenuBody>
          <CasConnection></CasConnection>
        </div>
      );
    }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    errorsList : state.menus.errorsList || null
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
