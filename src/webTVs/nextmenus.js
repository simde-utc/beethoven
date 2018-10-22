import React, { Component } from 'react';
import {connect} from 'react-redux'
import {REFRESH_TIMER} from '../Utils/config'
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {getList} from "../actions"
import {getToServe} from "../actions"

import MenuRow from '../containers/Menu/menuRow'

class MenuToServe extends Component{

returnMenuToServe(List){
  return(
    <Table>
      <thead>
        <tr>
          <th> Nom </th>
          <th> Prénom </th>
          <th> Qte </th>
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


        console.log();
      },
      REFRESH_TIMER
    )
}

render(){
  const {NavIndex, listToServe, loading} = this.props;
  const {getList} = this.props;
  let MenuList = []


  if(listToServe !==[] && listToServe.orders !== undefined )
  {
      listToServe.orders.forEach((menu)=>{
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
        {loading===true ? '':
          NavIndex!==null && NavIndex.toString()===listToServe.menu.id_payutc && listToServe.menu !== undefined && listToServe.menu.name+' - '+listToServe.menu.total_quantity+ ' / '+
          listToServe.menu.quantity+' - Commandes Servies : '+listToServe.menu.served_quantity
        }
      </h2>
      {NavIndex === null ?  <h3> Veuillez choisir un Menu de la liste</h3>
      :   loading === true || NavIndex.toString()!==listToServe.menu.id_payutc  ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
      NavIndex.toString()===listToServe.menu.id_payutc && this.returnMenuToServe(MenuList)
  }

    </div>

  )
}
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant

    loading : state.menus.loading || null,
    listToServe : state.menus.listToServe || [],
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
  (MenuToServe);
