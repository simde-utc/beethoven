import React, { Component } from 'react';

import {connect} from 'react-redux';

import '../../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';

import {deleteMenus, getMenus, getList, updateNavIndex} from '../../actions'


class MenuNavButton extends Component{
  render(){
    const {NavIndex} = this.props;
    const {deleteMenus, updateNavIndex, getMenus, getList} = this.props;
    return(
      <tr>
        <td style = {{height : '5%'}}>
        <NavItem
          href="#"
          focus = {this.props.index === NavIndex}
          style = {
            this.props.index === NavIndex ?
            {color:'white', background:'#B22132'} :
            {color:'white', background:'none'}
          }
          active = {this.props.index === NavIndex}
          onClick = {()=> {
            updateNavIndex(this.props.index)
            getList(NavIndex)
          }}
        >
        {this.props.nom}
        </NavItem>

        </td>
        <td><Button
          size="sm"
          onClick = {()=> {
            deleteMenus(this.props.index)
            getMenus()
          }}
          ><FaTrash size='1em'/></Button>
        </td>
      </tr>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    NavIndex : state.menus.NavIndex || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getMenus : ()=> dispatch(getMenus()),
    getList : (index)=> dispatch(getList(index)),
    updateNavIndex : (index)=>dispatch(updateNavIndex(index)),
    deleteMenus : (index)=>dispatch(deleteMenus(index))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MenuNavButton);
