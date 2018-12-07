import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../../App.css';

class NextMenuRow extends Component {
  render(){
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
      </tr>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(NextMenuRow)
