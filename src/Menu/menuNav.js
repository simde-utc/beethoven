import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import {MenuNavButton} from './menuNavButton'

import {errors} from '../Utils/utils'
import {componentExchange} from '../Utils/componentExchange'
import {fetchMenus, onTrashClick, fetchServed, fetchMenuList} from '../Utils/apiCalls'

export class MenuNav extends Component{
  constructor(props){
    super(props);

    this.state = {
      index : null,
      Menus : null
    };

  }

  componentDidMount(){
    fetchMenus((data)=>{
      this.setState({Menus:data})
    },
  (error)=>{
    console.log(error)
  });
  }

  onNavBtnClick(bSelected){
    this.setState({index : bSelected});
    this.props.updateNavIndex(bSelected)
    fetchMenuList(bSelected,
      (data)=>{
        console.log(data)
        this.props.updateMenuInformation(data.menu)
        this.props.updateMenuList(data.orders)
      },
      (err)=>{
        console.error(err)
      }
    )
    // TODO: FONCTIONS D ENVOIE dINFORMATION A AUTRE COMPONENT
  }

  render(){
    let List = []
    if(this.state.Menus != undefined && this.state.Menus != null ){
      this.state.Menus.forEach((item)=>{
        List.push(
          <MenuNavButton
          index = {item.article.id_payutc}
          nom = {item.article.nom}
          bId = {this.state.index}
          onClick = {()=> this.onNavBtnClick(item.article.id_payutc)}
          trashClick = {
            ()=> onTrashClick(item.article.id_payutc, this.state,
              (updatedMenuList)=>{
            if(updatedMenuList) this.setState({Menus:updatedMenuList})
          },
          (err)=>{
            if(err) console.log(err)
          }
        )}
          />
        )
      })
    }

    return(
      <div className = "MenuNav">
      <Nav vertical>
        <table style={{width:'100%'}}>
        {List}
      </table>
      </Nav>
      </div>
    );
  }
}
