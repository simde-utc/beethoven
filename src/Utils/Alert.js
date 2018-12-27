import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { DELETE_ERROR_TIMOUT } from './config';


import { deleteAlert } from '../actions';

class MyAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onDissmiss = this.onDissmiss.bind(this);
  }

  onDissmiss() {
    this.setState({ visible: false });
    const { deleteAlert } = this.props;
    deleteAlert();
  }

  componentDidMount() {
    setTimeout(() => this.onDissmiss(), DELETE_ERROR_TIMOUT);
  }

  render() {
    return (
      <Alert color={this.props.type} isOpen={this.state.visible} toggle={this.onDissmiss}>
        {this.props.message}
      </Alert>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  deleteAlert: () => dispatch(deleteAlert()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAlert);
