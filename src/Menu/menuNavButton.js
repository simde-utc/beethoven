import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';


import {errors} from '../Utils/utils'
import {onTrashClick, fetchMenus} from '../Utils/apiCalls'
import {componentExchange} from '../Utils/componentExchange'

export class MenuNavButton extends Component{


  constructor(props){
    super(props);
    this.state = {
      focused : false,
      navStyleSelected : {
        color : 'white',
        background :  '#B22132'
      },
      navStyle : {
        color : 'white',
        background :  'none'
      },
    }
  }

  onRadioBtnClick(){
    this.setState()
    //componentExchange.updateNavIndex(this.props.bId)
    //fetchMenuList(this.props.bId)
  }

  render(){
    return(
      <tr>
        <td>
        <NavItem
          href="#"
          focus = {this.props.index === this.props.bId}
          style = {this.props.index === this.props.bId ? this.state.navStyleSelected : this.state.navStyle}
          active = {this.props.index === this.props.bId}
          onClick = {this.props.onClick}
        >
        {this.props.nom}
        </NavItem>

        </td>
        <td><Button
          size="sm"
          onClick = {this.props.trashClick}
          ><FaTrash size='1em'/></Button>
        </td>
      </tr>
    );
  }
}
