import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap'
import { Container, Col, Row, Table } from 'reactstrap';

import {FaTrash} from 'react-icons/fa'


class AdminMultiInfo extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      url : ""
    }

  }
  componentWillMount()
  {
    //const {getMessagesList} = this.props;
    //getMessagesList();

  }
  render() {
    const {sessionId, username} = this.props
    let messages = [
      {url:'https://assos.utc.fr'},
      {url:'https://assos.utc.fr/picasso'},
      {url:'https://www.google.com'}
    ]
    let urlsTab = []
    messages.forEach((elt)=>{
      urlsTab.push(
        <tr>
          <td>{elt.url}</td>
          <td><FaTrash></FaTrash></td>
      </tr>)
    })
    return(
      <div
        className ="AdminMultiInfo"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row >
              <Col xs='12'>  <br></br>

                <h2>Interface Admin - Gestion des Messages</h2>
                <br></br>
              </Col>
            </Row>

            <Row>
              <Col xs={{size:12}} lg={{size:6, offset:3}}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Nouvel URL</InputGroupAddon>
                  <Input
                    placeholder="url"
                    style={{marginRight : '5px'}}
                    onChange = {(e)=>this.setState({url:e.target.value})}
                    />{' '}
                    <Button
                      style={{marginRight : '5px'}}
                      onClick = {()=>{
                        //functionToApi(url)

                      }}
                      >
                      Ajouter
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
                      <th>URL</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urlsTab}
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
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMultiInfo);
