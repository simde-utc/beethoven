import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../../App.css';
import {Button } from 'reactstrap';

import {validateMenu, getMenus, getList} from '../../actions'

class MenuRow extends Component {
  render(){
    const {listSales, NavIndex} = this.props;
    const {validateMenu, getList} = this.props
    return(
      <tr
        style = {this.props.served===true ?
          {
            color : 'white',
            background : 'rgba(171,163,150,0.5)'
          } :
        {
          color : 'white',
          background :  'none'
        } }
        >
        <td>{this.props.last_name}</td>
        <td>{this.props.first_name}</td>
        <td>{this.props.quantity}</td>
        <td><Button
          color='success'
          onClick = {() =>{
            validateMenu(this.props.id_transaction, listSales)
          }
          }
          disabled = {!this.props.served===false}

          >Valider</Button>
          {' '}
          <Button
            color='danger'
            onClick = {() => {
              validateMenu(this.props.id_transaction, listSales)
            }
            }
            disabled = {this.props.served===false}
            >Annuler</Button>
        </td>
      </tr>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    listSales : state.menus.listSales || [],
    NavIndex : state.menus.NavIndex || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getMenus : ()=> dispatch(getMenus()),
    getList : (index)=>dispatch(getList(index)),
    validateMenu : (index, listSales)=>dispatch(validateMenu(index, listSales))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MenuRow)
