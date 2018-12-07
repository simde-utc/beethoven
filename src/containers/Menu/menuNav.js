import React, { Component } from 'react';
import {connect} from 'react-redux'

import '../../App.css';
import {Nav} from 'reactstrap';
import MenuNavButton from './menuNavButton'


import {updateNavIndex, getMenus} from "../../actions"

class MenuNav extends Component{


  componentWillMount(){
    const {getMenus} = this.props;
    getMenus();
  }

  render(){
    const {MenuList} = this.props;
    let List = []
    if(MenuList!== [] ){
      MenuList.forEach((item)=>{
        List.push(
          <MenuNavButton
          index = {item.article.id_payutc}
          nom = {item.article.nom}
          />
        )
      })
    }

    return(
      <div className = "MenuNav"
        style =
        {List.length>0 ?{
          paddingTop:'20px',
          color : 'black',
          backgroundColor:'#e9e9e9',
        }:
        {
          paddingTop:'20px',
          color : 'black',
          backgroundColor:'none',

        }
      }
        >
      <Nav vertical>
        <table style={{width:'100%'}}>
        {List}
      </table>
      </Nav>
      </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    MenuList : state.menus.MenuList || [],
    NavIndex : state.menus.NavIndex || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getMenus : ()=> dispatch(getMenus()),
    updateNavIndex : (index)=>dispatch(updateNavIndex(index))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)(MenuNav);
