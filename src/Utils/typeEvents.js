import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CAS_LINK} from './config'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap'
import {getEventArticles, getSalesLocations} from '../actions'


class TypeEvents extends Component{
  constructor(props)
  {
    super(props)
    this.state = {
      modal : true
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
  componentDidMount() {
    const {getSalesLocations,sessionId} = this.props
    getSalesLocations(sessionId);
  }

  render(){
    const {getEventArticles, event_id, picked, listLocation} = this.props

    const location = [];
    if(listLocation){
      listLocation.forEach(function(element,i) {
        if(i==0){
          location.push(
            <Button
              color="primary" style = {
                {
                  marginRight: '5px',
                  marginTop: '5px'
                }
              }
              onClick = {()=> getEventArticles('0')}
            >{element.name}</Button>
          )
        }else{
          location.push(
            <Button
              color="primary" style = {
                {
                  marginRight: '5px',
                  marginTop: '5px'
                }
              }
              onClick = {()=> getEventArticles(i)}
            >{element.name}</Button>
          )
        }
      });
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
          <h2>- Choix du mode de vente -</h2>
          Veuillez choisir un mode pour la vente
          <br/>
          {location}
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    )
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionId : state.cas.sessionId || null,
    listLocation : state.vente.listLocation || [],
    event_id : state.vente.event_id || null,
    picked : state.vente.picked || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getEventArticles : (id)=> dispatch(getEventArticles(id)),
    getSalesLocations : (sessionid)=> dispatch(getSalesLocations(sessionid))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeEvents);
