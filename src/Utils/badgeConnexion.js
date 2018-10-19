import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CAS_LINK} from './config'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap'
import {getUserPin, getUserUid, setUserConnected, loginBadge, redirectLogin, login} from '../actions'

class BadgeConnexion extends Component{
  constructor(props)
  {
    super(props)
    this.state = {
      modal : true,
      ActualPin : null,
      MaskedPin : null
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

  updatePin(pin, number)
  {
    const {getUserPin} = this.props
    const {userUid, userPin} = this.props

    let newPin = pin!==null ? pin+number : number
    let Masked = null;
    for(let i=0; i<newPin.length-1; i++)
    {
      Masked = Masked!==null ? Masked+"*" : "*"
    }
    Masked = Masked!==null ? Masked+number : number

    if(newPin.length=== 4)
    {
      getUserPin(newPin)
    }

    this.setState({
      ActualPin : newPin,
      MaskedPin : Masked
    })


  }

  redirectCas(){
    const {redirectLogin, login} = this.props;
    redirectLogin()
    window.location=CAS_LINK
  }

  pinForm()
  {
    return(
      <ButtonToolbar
        >
        <ButtonGroup
          style=
          {
            {
              margin : '0 auto',
            }
          }

          >
          <ButtonGroup vertical>
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "1")}>1</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "4")}>4</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "7")}>7</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "#")}>#</Button>{' '}

        </ButtonGroup>
          <ButtonGroup vertical>
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "2")}>2</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "5")}>5</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "8")}>8</Button>{' '}
              <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "0")}>0</Button>{' '}

          </ButtonGroup>
          <ButtonGroup vertical>
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "3")}>3</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "6")}>6</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "9")}>9</Button>{' '}
            <Button size="lg" onClick={()=>this.updatePin(this.state.ActualPin, "*")}>*</Button>{' '}

          </ButtonGroup>
        </ButtonGroup>




      </ButtonToolbar>
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
        toggle = {this.toggle}
        >

        <ModalBody centered = {true}
          style = {
            {
              color : 'rgba(0,0,0,0.8)',
              textAlign : 'center'
            }
          }
          >
          <h2>- Connexion -</h2>
          Veuillez passer votre Badge pour vous connecter.
          <br/>
          {userUid!==null &&  'Pin :'}
          {this.state.ActualPin!== null ?  this.state.MaskedPin : ''}


          {userUid!==null ? this.pinForm() : ''}
          <br></br>
          {userUid!==null ?
            <Button
              color="danger"
              onClick = {()=>{this.setState({ActualPin:null})}}
            >Effacer Pin</Button> : ''}

        </ModalBody>
        <ModalFooter>
                    <a
                      href={CAS_LINK}
                      onClick = {()=>{
                        login()
                        redirectLogin()
                      }}
                      >Click to login</a>
        </ModalFooter>

      </Modal>
    )
  }
}
//<Button color="danger" onClick={()=>this.redirectCas()}>Je n'ai pas de Badge</Button>


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
    login : ()=>dispatch(login())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeConnexion);
