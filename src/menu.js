import React, { Component } from 'react';
import './App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


class MenuNav extends Component {

  constructor(props){
    super(props);

    this.state = {
      index: null
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }
    onRadioBtnClick(rSelected){
      this.setState({index : rSelected});
      console.log("rSelected = "+ rSelected + " index = "+ this.state.index)

    }

     addButton = (bName, bId)=>{

         return(
           <NavItem>
             <NavLink
               data-toogle="Menu"
               href="#"
               active = {this.state.index === {bId}}
               onClick = {() => this.onRadioBtnClick(bId)}
               >
               {bName}

             </NavLink>
           </NavItem>
         );
    }



  render() {
    return (
      <div className="MenuNav">

        <Nav vertical>

          <NavItem>{this.addButton("Menu 1", 12345)}</NavItem>

          <NavItem>{this.addButton("Menu 2", 3564)}</NavItem>
         <p>Selected : {this.state.index}</p>
        </Nav>


      </div>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <div className="Header">
        <p className="App-intro">
          Liste des menus.
        </p>
      </div>
    );
  }
}

class MenuBody extends Component {


  render() {
    return (
      <div className="MenuBody">
        <div class="container-fluid">
          <div class ="row">
            <div class ="col-md-3"><MenuNav></MenuNav></div>
            <div class ="col-md-9"><Menu></Menu></div>




          </div>


        </div>


      </div>
    );
  }
}



export default MenuBody;
