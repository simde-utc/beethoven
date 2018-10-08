import React, { Component } from 'react';
import {Alert} from 'reactstrap';

import {connect} from "react-redux"

import {deleteError} from '../actions'

class ErrorAlert extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visible : true
    }

    this.onDissmiss = this.onDissmiss.bind(this)
  }

  onDissmiss(){
    this.setState({visible : false})
    const {deleteError} = this.props
    deleteError()
  }

  render(){
    return(
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDissmiss}>
      {this.props.err}
      </Alert>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    deleteError : ()=> dispatch(deleteError()),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ErrorAlert);
