import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';


import {MenuNav} from './menuNav'
import {MenuList} from './menuList'
import {errors} from '../Utils/utils'
import {fetchMenus, onTrashClick} from '../Utils/apiCalls'



class MenuBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      NavIndex : null,
      MenuInformation : [],
      MenuList : []
    };
  }

  updateNavIndex = (myNavIndex)=>{
    this.setState({NavIndex : myNavIndex})
  }

  updateMenuInformation = (MenuInformation)=>{
    this.setState({MenuInformation})
  }

  updateMenuList = (myMenuList)=>{
    console.log("LA FONCTION MARCHE")
    this.setState({MenuList :myMenuList})
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      console.log(this.state.NavIndex)
      console.log(this.state.MenuInformation)
      console.log(this.state.MenuList)
    }, 5000)
}

  componentWillUnmount() {
clearInterval(this.interval);
}

  render() {
    return (
      <div className="MenuBody">
        <Container fluid>
          <Row>
          <Col md="3"> <MenuNav
            updateNavIndex = {this.updateNavIndex}
            updateMenuInformation = {this.updateMenuInformation}
            updateMenuList = {this.updateMenuList}

            ></MenuNav> </Col>
          <Col md="9"> <MenuList
            updateNavIndex = {this.updateNavIndex}
            updateMenuInformation = {this.updateMenuInformation}
            updateMenuList = {this.updateMenuList}
            NavIndex = {this.state.NavIndex}
            MenuList = {this.state.MenuList}
            MenuInformation = {this.state.MenuInformation}
            /></Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default MenuBody;
