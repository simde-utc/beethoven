import React, { Component } from 'react';
import {Alert} from 'reactstrap';
import {DELETE_ERROR_TIMOUT} from './config'


import {connect} from "react-redux"
import {deleteAlert} from '../actions'
class MyAlert extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible : true
    }
    this.onDissmiss = this.onDissmiss.bind(this)
  }

  onDissmiss(){
    this.setState({visible : false})
    const {deleteAlert} = this.props
    deleteAlert()
  }

  componentDidMount(){
    setTimeout(()=> this.onDissmiss(),DELETE_ERROR_TIMOUT)
  }

  render(){
    return(
          <Alert color={this.props.type} isOpen={this.state.visible} toggle={this.onDissmiss}>
          {this.props.message}
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
    deleteAlert : ()=> dispatch(deleteAlert()),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(MyAlert);
