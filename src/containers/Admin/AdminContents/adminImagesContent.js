import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Input, Button, Label} from 'reactstrap'
import { Container, Col, Row, Table } from 'reactstrap';

import {MdMessage} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'

import {getMessagesList, addMessage, deleteMessage} from '../../../actions'
class AdminImagesContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      title : "",
      text : ""
    }

  }
  componentWillMount()
  {
    const {getMessagesList} = this.props;
    getMessagesList();

  }
  render() {
    const {sessionId, username, messages} = this.props
    const {addMessage, deleteMessage} = this.props

    let messagesTab = []
    messages.forEach((elt)=>{
      messagesTab.push(
        <tr>
          <td>{elt.title}</td>
          <td>{elt.text}</td>
          <td><FaTrash onClick={()=>deleteMessage(elt.id)}></FaTrash></td>
      </tr>)
    })
    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row >
              <Col xs='12'>  <br></br>

                <h2>Interface Admin - Gestion des Images</h2>
                <br></br>
              </Col>
            </Row>

            <Row>
              <Col xs={{size:12}} lg={{size:6, offset:3}}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Message</InputGroupAddon>
                  <Input
                    placeholder="Titre"
                    style={{marginRight : '5px'}}
                    onChange = {(e)=>this.setState({title:e.target.value})}
                    />{' '}
                    <Input
                      placeholder="Texte"
                      style={{marginRight : '5px'}}
                      onChange = {(e)=>this.setState({text:e.target.value})}
                      />{' '}
                    <Button
                      style={{marginRight : '5px'}}
                      onClick = {()=>{

                        addMessage(this.state.title, this.state.text)

                      }}
                      >
                      Envoyer
                    </Button>
                </InputGroup>
                <br></br>
              </Col>
            </Row>
            <Row >
              <Col xs={{size:12}} lg={{size:6, offset:3}}>
                <Table>
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messagesTab}
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
    messages : state.webTV.messages || null,
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getMessagesList : ()=>dispatch(getMessagesList()),
    addMessage : (title, text)=>dispatch(addMessage(title, text)),
    deleteMessage : (idMessage)=>dispatch(deleteMessage(idMessage))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminImagesContent);
