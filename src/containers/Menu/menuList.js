import React, { Component } from 'react';
import {connect} from 'react-redux'
import {REFRESH_TIMER} from '../../Utils/config'
import '../../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table, Button } from 'reactstrap';
import MenuRow from './menuRow'

import {REFRESH_TIMER} from '../../Utils/config'
import {getList} from "../../actions"

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

componentDidMount(){
  this.updateData()
}

componentWillUnMount(){
  clearInterval(this.interval)
}

updateData = ()=>{

    this.interval = setInterval(
      ()=>{

        this.props.getList(this.props.NavIndex)
      },
      REFRESH_TIMER
    )
}

render(){
  const {NavIndex, listSales, loading} = this.props;
  const {getList} = this.props;
  let MenuList = []


  if(listSales !==[] && listSales.orders !== undefined )
  {
      listSales.orders.forEach((menu)=>{
        MenuList.push(<MenuRow
          last_name={menu.last_name}
          first_name={menu.first_name}
          quantity={menu.quantity}
          id_transaction= {menu.id_transaction}
          served = {menu.served}
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
      </h2>
      {NavIndex === null ? <h3> Veuillez choisir un Menu de la liste</h3>
      :  listSales.menu === undefined && loading === true ? "loading" :
      this.returnMenuList(MenuList)


  }

    </div>

  )
}
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    listSales : state.menus.listSales || [],
    NavIndex : state.menus.NavIndex || null,
    loading : state.menus.loading || null
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
