import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap'
import {getUserPin, getUserUid, setUserConnected} from '../actions'

class BadgeConnexion extends Component{
  constructor(props)
  {
    super(props)
    this.state = {
      modal : true,
      ActualPin : null
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
    const {setUserConnected} = this.props
    let newPin = pin!==null ? pin+number : number
    if(newPin.length=== 4) setUserConnected()

    this.setState({ActualPin : newPin})


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
          <h2>- Connexion -</h2>
          Veuillez passer votre Badge pour vous connecter.
          <br/>
          {userUid!==null &&  'Pin :'}
          {this.state.ActualPin!== null ?  this.state.ActualPin : ''}


          {userUid!==null ? this.pinForm() : ''}
          <br></br>
          {userUid!==null ?
            <Button
              color="danger"
              onClick = {()=>{this.setState({ActualPin:null})}}
            >Effacer Pin</Button> : ''}

        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle}>Je n'ai pas de Badge</Button>

        </ModalFooter>

      </Modal>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    userUid : state.utils.userUid || null,
    userPin : state.utils.userPin || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getUserUid : (uid)=>dispatch(getUserUid(uid)),
    getUserPin : (pin)=>dispatch(getUserPin(pin)),
    setUserConnected : ()=>dispatch(setUserConnected())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeConnexion);
