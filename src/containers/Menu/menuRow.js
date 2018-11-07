import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../../App.css';
import {Button } from 'reactstrap';

import {validateMenu, getMenus, getList, setStaff} from '../../actions'

class MenuRow extends Component {
  render(){
    const {listSales, NavIndex} = this.props;
    const {validateMenu, getList, setStaff} = this.props
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
          disabled = {!this.props.served===false && !this.props.is_staff===false}

          >Valider</Button>
          {' '}
          <Button
            color={this.props.served===true ? 'danger' : 'warning'}
            onClick = {() => {
              this.props.served === true ?
              validateMenu(this.props.id_transaction, listSales) :
              setStaff(this.props.id_transaction)
            }
            }

            >{this.props.served===true ? 'Annuler' : this.props.is_staff===true ?'not Staff' : 'Staff'}</Button>
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
    validateMenu : (index, listSales)=>dispatch(validateMenu(index, listSales)),
    setStaff : (index)=>dispatch(setStaff(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MenuRow)
