import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { DELETE_ERROR_TIMOUT } from './config';


import { deleteError } from '../actions';

class ErrorAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onDissmiss = this.onDissmiss.bind(this);
  }

  onDissmiss() {
    this.setState({ visible: false });
    const { deleteError } = this.props;
    deleteError();
  }

  componentDidMount() {
    setTimeout(() => this.onDissmiss(), DELETE_ERROR_TIMOUT);
  }

  render() {
    return (
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDissmiss}>
        {this.props.err}
      </Alert>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  deleteError: () => dispatch(deleteError()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorAlert);
