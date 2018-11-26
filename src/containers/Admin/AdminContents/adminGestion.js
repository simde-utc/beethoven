import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Jumbotron, Button,ButtonGroup, Label} from 'reactstrap'
import { Container, Col, Row } from 'reactstrap';

class AdminGestion extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      init : false
    }

  }
  componentWillMount()
  {
  }



  render() {

    const {sessionId, username} = this.props

    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row>
              <Col sm = '12' md='12'>
                <h2>Interface Admin - Gestion de carte</h2>
                <br></br>
              </Col>
            </Row>
            <Row style = {{marginBottom : '1vh'}}>
              {/*Partie bloquage de carte*/}
              <Col sm = '6' md='6'>
               <Button style={{backgroundColor : '#00000c'}}>
                <Jumbotron style={{backgroundColor : '#00000c'}}>
                  <h2 style={{color:'white'}}>Bloquage de carte</h2>

                </Jumbotron>
               </Button>
              </Col>
              {/*Partie carte perdue de carte #000223*/}
              <Col sm = '6' md='6'>
               <Button style={{backgroundColor : '#00000c'}}>
                <Jumbotron style={{backgroundColor : '#00000c'}}>
                  <h2 style={{color:'white'}}>Carte Etu Perdue</h2>
                </Jumbotron>
               </Button>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminGestion);
