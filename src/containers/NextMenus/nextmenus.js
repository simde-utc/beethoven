import React, { Component } from 'react';
import {connect} from 'react-redux'
import {REFRESH_TIMER} from '../../Utils/config'
import '../../App.css';
import {Table} from 'reactstrap';
import {getList} from "../../actions"
import {getToServe} from "../../actions"

import NextMenuRow from './nextMenusRows'

class MenuToServe extends Component{

returnMenuToServe(List){
  return(
    <Table style = {{
        fontSize : '2em'
      }}>
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

componentWillUnmount(){
  clearInterval(this.interval)
}

updateData = ()=>{
  const {getToServe} = this.props

    this.interval = setInterval(
      ()=>{
        getToServe()
      },
      REFRESH_TIMER
    )
}

render(){
  const {listToServe} = this.props;
  let MenuList = []


  if(listToServe !==[] && listToServe.orders !== undefined )
  {
      listToServe.orders.forEach((menu)=>{
        MenuList.push(<NextMenuRow
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
      {MenuList!==[] && this.returnMenuToServe(MenuList)
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
    getList : (index)=> dispatch(getList(index)),
    getToServe : ()=> dispatch(getToServe())
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)(MenuToServe);
