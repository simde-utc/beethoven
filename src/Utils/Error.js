import React, { Component } from 'react';
import {Alert} from 'reactstrap';





export class ErrorAlert extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visible : true
    }

    this.onDissmiss = this.onDissmiss.bind(this)
  }

  onDissmiss(){
    this.setState({visible : false})
  }

  render(){
    return(
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDissmiss}>
      Error : {this.props.err}
      </Alert>
    )
  }
}

export default ErrorAlert;
