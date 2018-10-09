import React, { Component } from 'react';
import './App.css';
import CasConnection from './config';
import MenuBody from './Containers//Menu/menu';
import Vente from './Containers/Vente/vente';
import {connect} from 'react-redux';

import { login } from "./Actions";


class Header extends Component {
  componentDidMount(){
      const {login} = this.props;
      login();
      const {sessionid, authent} = this.props
  }
  constructor(props){
      super(props)
      this.state = {
        load: 'Menu'
      }
      this.setMenuPage = this.setMenuPage.bind(this)
      this.setVentePage = this.setVentePage.bind(this)
  }

  setMenuPage(){
    this.setState({
      load: 'Menu'
    })
  }
  setVentePage(){
    this.setState({
      load: 'Vente'
    })
  }

  render() {
    const {sessionid, authent} = this.props
    let affichage;
    switch(this.state.load){
      case 'Vente' :
        affichage = <Vente sessionid={sessionid}></Vente>
        break;
      case 'Menu' : affichage = <MenuBody></MenuBody>
      break;
      default: break;
    }

    return (
      <div>
        <div className="Header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Beethoven</a>
            <span className="input-group-btn">
                <a href="https://cas.utc.fr/cas/login?service=http%3A%2F%2Flocalhost%3A3000">Click to login</a>
            </span>
          <span className="input-group-btn">
            <a href="https://cas.utc.fr/cas/logout">LOGOUT</a>
          </span>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            </ul>
            <button class="btn btn-outline-secondary my-2 my-sm-0" onClick={this.setMenuPage}>Menu</button>
            <button class="btn btn-outline-secondary my-2 my-sm-0" onClick={this.setVentePage}>Vente</button>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Admin</button>
          </div>
        </nav>
      </div>
      {affichage}
      </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    authent : state.cas.authent || false,
    sessionid : state.cas.sessionid || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    login : ()=>dispatch(login())
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Header);
