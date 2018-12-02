import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Jumbotron, Button,ButtonGroup, Label, Table} from 'reactstrap'
import { Container, Col, Row } from 'reactstrap';
import {setBloquageState, blockAUser, setClientState, getBlockedUsers } from "../../../actions"


class AdminGestion extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      init : false
    }
  }
  componentDidMount(){
    const {getBlockedUsers, sessionId} = this.props
    getBlockedUsers(sessionId);
  }

  render() {
    const {sessionId, username, info_client, setBloquageState, blockAUser, blocage, blocked, setClientState, clientUid,getBlockedUsers, list_blockedUsers} = this.props
    let info;
    let today = new Date();
    today.setMonth(today.getMonth()+6);
    var date_blocked = today.toISOString();

    var list_blocked = [];
    var tab = Object.keys(list_blockedUsers);
    tab.forEach(function(prop) {
      list_blocked.push(
            <tr>
              <th> {list_blockedUsers[prop].usr_lastname} </th>
              <th> {list_blockedUsers[prop].usr_firstname}</th>
              <th> {list_blockedUsers[prop].blo_raison} </th>
              <th> {list_blockedUsers[prop].blo_removed} </th>
            </tr>
      );
    });


    if(info_client){
      if(blocked=='listen'){
        info = (<div class="modal show" id="infoblock" style={{display: 'inline-block'}} role="dialog">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title text-info" >{info_client.firstname}   {info_client.lastname} - {info_client.username}</h5>
                            </div>
                            <div class="modal-body text-info">
                              <Container fluid>
                                <Row style = {{marginBottom : '5vh'}}>
                                  <Col sm = '12' md='12'>
                                    <button type="button" class="btn btn-danger" onClick={()=>blockAUser(sessionId,clientUid,date_blocked)}>Bloquer l'utilisateur</button>
                                  </Col>
                                </Row>
                                <Row style = {{marginTop : '2vh'}}>
                                  <Col sm = '12' md='12'>
                                    <button type="button" class="btn btn-primary">Carte perdue : Envoyer un mail</button>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setClientState()}>Fermer</button>
                            </div>
                          </div>
                        </div>
                      </div>)
      }else{
        info = (
          <div class="modal show" id="infouser" style={{display: 'inline-block'}} role="dialog">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title text-info" >{info_client.firstname}   {info_client.lastname} - {info_client.username}v</h5>
                              </div>
                              <div class="modal-body text-info">
                                <Container fluid>
                                  <Row style = {{marginBottom : '5vh'}}>
                                    <Col sm = '12' md='12'>
                                      <button type="button" class="btn btn-warning" data-dismiss="modal">Utilisateur bloqué</button>
                                    </Col>
                                  </Row>
                                  <Row style = {{marginTop : '2vh'}}>
                                    <Col sm = '12' md='12'>
                                      <button type="button" class="btn btn-primary" data-dismiss="modal">Carte perdue : Envoyer un mail</button>
                                    </Col>
                                  </Row>
                                </Container>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setBloquageState('listen');
                                                                                                                    setClientState()}}>Fermer</button>
                              </div>
                            </div>
                          </div>
                        </div>
        )
      }
    }else{info = (<div></div>)}



    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row style = {{marginBottom : '1vh'}}>
              <Col sm = '12' md='12'>
                <h2>Interface Admin - Gestion de carte</h2>
                <br></br>
              </Col>
            </Row>
            <Row style = {{marginBottom : '1vh'}}>
              {/*Partie bloquage/Carte etu perdue de carte*/}
              <Col sm = '12' md='12'>
                <Jumbotron style={{backgroundColor : '#dc3545'}}>
                  <h2 style={{color:'white'}}>Veuillez passer la carte</h2>
                  {info}
                </Jumbotron>
                <h3>Personnes bloquées</h3>
                <Table>
                  <thead>
                    <tr style={{
                        fontSize : '1.5em'
                      }}>
                      <th> Nom </th>
                      <th> Prénom </th>
                      <th> Raison </th>
                      <th> Date de fin </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list_blocked}
                  </tbody>
                </Table>
              </Col>
            </Row>
        </Container>
          :""

        }
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    sessionId : state.cas.sessionId || null,
    username : state.cas.username || null,
    info_client : state.achats.info_client || null,
    blocked: state.admin.blocked || 'listen',
    blocage: state.admin.blocage || [],
    clientUid: state.achats.clientUid || null,
    list_blockedUsers: state.admin.list_blockedUsers || [],
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    setClientState : ()=> dispatch(setClientState()),
    setBloquageState : (a)=> dispatch(setBloquageState(a)),
    blockAUser : (sessionId,username,date_fin)=> dispatch(blockAUser(sessionId,username,date_fin)),
    getBlockedUsers : (sess)=> dispatch(getBlockedUsers(sess)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminGestion);
