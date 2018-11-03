import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Input, Button, Label} from 'reactstrap'
import { Container, Col, Row } from 'reactstrap';


import {getTvLink, setTvLink} from '../../../actions'
class AdminWebTvContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      webTv1 : null,
      webTv2 : null,
      messages1 : this.props.webTv1Messages,
      messages2 : this.props.webTv2Messages
    }

  }
  componentWillMount()
  {
    const {getTvLink} = this.props;
    getTvLink(1)
    getTvLink(2)
  }
  render() {
    const {sessionId, username, webTv1Url, webTv2Url} = this.props
    const {setTvLink} = this.props
    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null ?

          <Container fluid>
            <Row>
              <Col sm = '12' md='12'>
                <h2>Interface Admin - Gestion des Télés</h2>
                <br></br>
              </Col>
            </Row>
            {/*Liste des Télés et lien de chacune*/}
            <Row style = {{marginBottom : '1vh'}}>
              <Col xs={{size:12, offset:0}} lg={{size:6, offset:3}}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@ WebTV 1</InputGroupAddon>
                  <Input
                    placeholder={webTv1Url}
                    style={{marginRight : '5px'}}
                    onChange = {(e)=>this.setState({webTv1:e.target.value})}
                    />{' '}
                    <Button
                      style={{marginRight : '5px'}}
                      onClick = {()=>{

                        setTvLink(1, this.state.webTv1, this.state.messages1)

                      }}
                      >
                      Envoyer
                    </Button>
                    <Button
                      color={this.state.messages1 === true ? 'success' : 'danger'}
                      onClick = {()=>{this.setState({messages1:!this.state.messages1})}}
                      >
                      Messages
                    </Button>
                </InputGroup>
                </Col>
            </Row>

            <Row style = {{marginBottom : '1vh'}}>
              <Col xs={{size:12, offset:0}} lg={{size:6, offset:3}}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@ WebTV 2</InputGroupAddon>
                  <Input
                    placeholder={webTv2Url}
                    style={{marginRight : '5px'}}
                    onChange = {(e)=>this.setState({webTv2:e.target.value})}
                    />{' '}
                    <Button
                      style={{marginRight : '5px'}}
                      onClick = {()=>{
                        setTvLink(2, this.state.webTv2, this.state.messages2)

                      }}
                      >

                      Envoyer
                    </Button>
                    <Button
                      color={this.state.messages2 === true ? 'success' : 'danger'}
                      onClick = {()=>{this.setState({messages2:!this.state.messages2})}}
                      >
                      Messages
                    </Button>
                </InputGroup>
                </Col>
            </Row>


            {/*TODO: Ajouter la liste des boutons de préselection*/}
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
    webTv1Url : state.admin.webTv1Url || null,
    webTv2Url : state.admin.webTv2Url || null,
    webTv1Messages : state.admin.webTv1Messages || null,
    webTv2Messages : state.admin.webTv2Messages || null,

  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getTvLink : (idTv)=>dispatch(getTvLink(idTv)),
    setTvLink : (idTv, url, messages)=>dispatch(setTvLink(idTv,url,messages)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminWebTvContent);
