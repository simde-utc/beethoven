import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalBody,
} from 'reactstrap';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import {
  getUserPin, getUserUid, loginBadge, redirectLogin, login,
} from '../actions';

class BadgeConnexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      ActualPin: null,
      MaskedPin: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(
      {
        modal: !this.state.modal,
      },
    );
  }

  updatePin(pin, number) {
    const { getUserPin } = this.props;
    console.log(pin)

    const newPin = pin !== null ? pin.toString() + number.toString() : number.toString();
    let Masked = null;
    for (let i = 0; i < newPin.length - 1; i++) {
      Masked = Masked !== null ? `${Masked}*` : '*';
    }
    Masked = Masked !== null ? Masked + number.toString() : number.toString();

    if (newPin.length === 4) {
      getUserPin(newPin)
    }

    this.setState({
      ActualPin: newPin,
      MaskedPin: Masked,
    });
  }


  pinForm() {
    const pinButtons = [[1,4,7,'#'],[2,5,8,0], [3,6,9,'*']];

    return (
      <ButtonToolbar>
        <ButtonGroup style={
          {
            margin: '0 auto',
          }

        }
        >
        {
          pinButtons.map(buttons => (<ButtonGroup vertical>

    {

      buttons.map(button => <Button size="lg" onClick={() => {this.updatePin(this.state.ActualPin, button)}}>{ button }</Button>)
    }

  </ButtonGroup>))
        }
      </ButtonGroup>


      </ButtonToolbar>
    );
  }

  render() {
    const { userUid, userPin } = this.props;
    const { loginBadge} = this.props;

    if (userUid !== null && userPin !== null) {
      loginBadge(userUid, userPin);
    }
    return (
      <Modal
        isOpen={this.state.modal}
      >

        <ModalBody
          centered
          style={
            {
              color: 'rgba(0,0,0,0.8)',
              textAlign: 'center',
            }
          }
        >
          <h2>- Connexion -</h2>
          Veuillez passer votre Badge pour vous connecter.
          <br />
          {userUid !== null && 'Pin :'}
          {this.state.ActualPin !== null ? this.state.MaskedPin : ''}


          {userUid !== null ? this.pinForm() : ''}
          <br />
          {userUid !== null
            ? (
              <Button
                color="danger"
                onClick={() => { this.setState({ ActualPin: null }); }}
              >
Effacer Pin
              </Button>
            ) : ''}

        </ModalBody>


      </Modal>
    );
  }
}
// <Button color="danger" onClick={()=>this.redirectCas()}>Je n'ai pas de Badge</Button>


const mapStateToProps = state => ({
  // mettre ce qu'on veut faire passer en props du composant
  userUid: state.cas.userUid || null,
  userPin: state.cas.userPin || null,
});

const mapDispatchToProps = dispatch => ({
  redirectLogin: () => dispatch(redirectLogin()),
  getUserUid: uid => dispatch(getUserUid(uid)),
  getUserPin: pin => dispatch(getUserPin(pin)),
  loginBadge: (userUid, userPin) => dispatch(loginBadge(userUid, userPin)),
  login: () => dispatch(login()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BadgeConnexion);
