import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import {MenuNavButton} from './menuNavButton'
import {MenuRow} from './menuRow'
import {errors} from '../Utils/utils'
import {fetchMenus, onTrashClick, fetchServed, fetchMenuList} from '../Utils/apiCalls'

export class MenuList extends Component{
  constructor(props){
    super(props)
    this.state = {
      NavIndex : null,
      MenuList : [],
      MenuInformation : [],
    }
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      console.log(this.state.MenuList)
      console.log(this.state.NavIndex)
    }, 5000)

    /*this.interval = setInterval(()=>{
      console.log('update data')
      fetchMenuList(this.state.NavIndex,
        (data)=>{
          this.props.updateMenuInformation(data.menu, this)
          this.props.updateMenuList(data.orders, this)
        },
        (err)=>{
          console.error(err)
        }
      )
    }, 5000)*/
}

  componentWillUnmount() {
clearInterval(this.interval);
}

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
  let MenuList = []
  if(this.state.MenuList !== undefined && this.state.MenuList !== null )
  {
      this.state.MenuList.forEach((menu,index)=>{
        MenuList.push(<MenuRow
          last_name={menu.last_name}
          first_name={menu.last_name}
          quantity={menu.quantity}
          id_transaction= {menu.id_transaction}
          NavIndex={this.state.NavIndex}
          updateNavIndex = {this.props.updateNavIndex}
          updateMenuInformation = {this.props.updateMenuInformation}
          updateMenuList = {this.props.updateMenuList}
          />)
      })
  }
  return(
    <div className="Menu">
      <h2>
        {this.state.NavIndex && this.state.MenuInformation ? ''+
          this.state.MenuInformation.name+' - '+
          this.state.MenuInformation.total_quantity + ' / '+ this.state.MenuInformation.quantity+
          ' - Commandes Servies : ' + this.state.MenuInformation.served_quantity
           : ''}
      </h2> {this.state.NavIndex && this.state.MenuInformation ? this.returnMenuList(MenuList) : <h3> Veuillez choisir un Menu de la liste</h3>}
    </div>

  )
}


}
