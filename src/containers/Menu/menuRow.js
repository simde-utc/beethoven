import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../../App.css';
import {Button } from 'reactstrap';

import {validateMenu, getMenus, getList, setStaff} from '../../actions'

class MenuRow extends Component {
  render(){
    const {listSales} = this.props;
    const {validateMenu, setStaff} = this.props
    return(
      <tr
        style = {this.props.served===true ?
          {
            color : 'white',
            fontSize : '1.5em',
            background : 'rgba(171,163,150,0.5)'
          } :
        {
          color : 'white',
          fontSize : '1.5em',
          background :  'none'
        } }
        >
        <td>{this.props.last_name}</td>
        <td>{this.props.first_name}</td>
        <td>{this.props.quantity}</td>
        <td><Button
          color='success'
          onMouseDown = {() =>{
            validateMenu(this.props.id_transaction, listSales)
          }
          }
          disabled = {this.props.served===true }

          >Valider</Button>
          {' '}
          <Button
            color={this.props.served===true ? 'danger' : 'warning'}
            onMouseDown = {() => {
              this.props.served === true ?
              validateMenu(this.props.id_transaction, listSales) :
              setStaff(this.props.id_transaction)
            }
            }

            >{this.props.served===true ? 'Annuler' : this.props.is_staff===true ?'Remettre' : 'Reporter'}</Button>
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
  mapDispatchToProps)(MenuRow)
