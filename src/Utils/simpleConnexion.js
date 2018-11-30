import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CAS_LINK} from './config'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap'
import {Container, Col, Row, Input} from 'reactstrap'
import {getUserPin, getUserUid, setUserConnected, loginBadge, redirectLogin, login,ginger} from '../actions'

class SimpleConnexion extends Component{
  constructor(props)
  {
    super(props)
    this.state = {
      modal : true,
      pin : null,
      username : null
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState(
      {
        modal : !this.state.modal
      }
    )
  }


  render(){


    const {userUid, userPin} = this.props;
    const {loginBadge, redirectLogin} = this.props;

    if(userUid!==null && userPin!==null)
    {
      loginBadge(userUid, userPin)
    }
    return(
      <Modal
        isOpen = {this.state.modal}
        >

        <ModalBody centered = {true}
          style = {
            {
              color : 'rgba(0,0,0,0.8)',
              textAlign : 'center'
            }
          }
          >

          <Container fluid>
            <Row>
              <Col xs='12'>
                <h2>- Connexion -</h2>
                Veuillez entrer votre login et votre pin pour vous connecter.
              </Col>
            </Row>
            <Row>
              <Col xs='12'>
                <Input
                  placeholder='login'
                  onChange = {(e)=>this.setState({username:e.target.value})}
                  ></Input>
                <br/>
                <Input
                  placeholder='pin'
                  type='password'
                  onChange = {(e)=>this.setState({pin:e.target.value})}
                  ></Input>
                <br/>
                <Button
                  color='success'
                  onClick = {()=>{
                    if(this.state.username!==null)
                      this.props.ginger(this.state.username)

                    if(this.state.pin!==null)
                      this.props.getUserPin(this.state.pin)
                  }}
                  >Se Connecter</Button>
              </Col>

            </Row>

          </Container>


        </ModalBody>
      </Modal>
    )
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    userUid : state.cas.userUid || null,
    userPin : state.cas.userPin || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    redirectLogin : ()=>dispatch(redirectLogin()),
    getUserUid : (uid)=>dispatch(getUserUid(uid)),
    getUserPin : (pin)=>dispatch(getUserPin(pin)),
    loginBadge : (userUid, userPin)=>dispatch(loginBadge(userUid, userPin)),
    login : ()=>dispatch(login()),
    ginger: (username)=>dispatch(ginger(username))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleConnexion);
