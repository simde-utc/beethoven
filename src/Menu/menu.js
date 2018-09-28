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
  }

  updateNavIndex(NavIndex){
    this.setState({NavIndex})
  }

  updateMenuInformation(MenuInformation){
    this.setState({MenuInformation})
  }

  updateMenuList(MenuList){
    this.setState({MenuList})
  }

  render() {
    return (
      <div className="MenuBody">
        <Container fluid>
          <Row>
          <Col md="3"> <MenuNav
            updateNavIndex = {(NavIndex)=>{this.updateNavIndex(NavIndex)}}
            updateMenuInformation = {(MenuInformation)=>{this.updateMenuInformation(MenuInformation)}}
            updateMenuList = {(MenuList)=>{this.updateMenuList(MenuList)}}

            ></MenuNav> </Col>
          <Col md="9"> <MenuList
            updateNavIndex = {this.updateNavIndex.bind(this)}
            updateMenuInformation = {this.updateMenuInformation.bind(this)}
            updateMenuList = {this.updateMenuList.bind(this)}
            /></Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default MenuBody;
