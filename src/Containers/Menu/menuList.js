import React, { Component } from 'react';
import {connect} from 'react-redux'

import '../../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import {MenuNavButton} from './menuNavButton'
import {MenuRow} from './menuRow'

import {getList} from "../../Actions"

class MenuList extends Component{

returnMenuList(List){
  return(
    <Table>
      <thead>
        <tr>
          <th> Nom </th>
          <th> Prénom </th>
          <th> Qte </th>
          <th> Servi </th>
        </tr>
      </thead>
      <tbody>
        {List}
      </tbody>
    </Table>
  )
}

render(){
  const {NavIndex, listSales} = this.props;
  const {getList} = this.props;
  let MenuList = []

// TODO: Faire ca différemment?
  this.interval = setInterval(()=>{
    if(NavIndex!==null){
      console.log("data")
      getList(NavIndex)
    }
    else {
      console.log(NavIndex)
    }
  }, 10000)

  if(listSales !==[] && listSales.orders !== undefined )
  {
      listSales.orders.forEach((menu)=>{
        MenuList.push(<MenuRow
          last_name={menu.last_name}
          first_name={menu.first_name}
          quantity={menu.quantity}
          id_transaction= {menu.id_transaction}
          />)
      })
  }
  return(
    <div className="Menu">
      <h2>
        {NavIndex !==null && listSales.menu !== undefined ? ''+
          listSales.menu.name+' - '+
          listSales.menu.total_quantity + ' / '+ listSales.menu.quantity+
          ' - Commandes Servies : ' + listSales.menu.served_quantity
           : ''}
      </h2> {NavIndex !== null && listSales.menu !== undefined ? this.returnMenuList(MenuList) : <h3> Veuillez choisir un Menu de la liste</h3>}
    </div>

  )
}
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    listSales : state.menus.listSales || [],
    NavIndex : state.menus.NavIndex || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getList : (index)=> dispatch(getList(index))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MenuList);
