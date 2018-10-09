import React, { Component } from 'react';
import '../../App.css';
import {Button } from 'reactstrap';

import {MenuNav} from './menuNav'
import {fetchMenus, onTrashClick, fetchServed, fetchMenuList} from '../../Utils/apiCalls'
import {connect} from 'react-redux'



export class MenuRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      served : false,
      rowValide : {
        color : 'white',
        background : 'rgba(171,163,150,0.5)'
      },

      rowUnvalide : {
        color : 'white',
        background :  'none'
      }
    }
  }

  onButtonClick(){
    this.setState({served:true})

    fetchServed(this.props.id_transaction,
      (data)=>{
        if(data) fetchMenuList(this.props.NavIndex,
          (data)=>{
            this.props.updateMenuInformation(data.menu)
            this.props.updateMenuList(data.orders)
          },
          (err)=>{
            console.error(err)
          }
        )
    },
    (err)=>{
      if(err) console.error(err) // TODO: error Classe
    }
  )
  }


  render(){
    return(
      <tr
        style = {this.state.served===false ? this.state.rowUnvalide : this.state.rowValide }
        >
        <td>{this.props.last_name}</td>
        <td>{this.props.first_name}</td>
        <td>{this.props.quantity}</td>
        <td><Button
          color='success'
          onClick = {() =>this.onButtonClick()}
          disabled = {!this.state.served===false}

          >Valider</Button>
          {' '}
          <Button
            color='danger'
            onClick = {() =>this.onButtonClick()}
            disabled = {this.state.served===false}
            >Annuler</Button>
        </td>
      </tr>
    )
  }
}
