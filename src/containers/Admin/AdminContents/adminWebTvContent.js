import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap'
import { Container, Col, Row } from 'reactstrap';


import {getTvLink, setTvLink, getDefaultUrl} from '../../../actions'
class AdminWebTvContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      webTv1 : this.props.webTv1Url,
      webTv2 : this.props.webTv1Url,
      messages1 : this.props.webTv1Messages,
      messages2 : this.props.webTv2Messages,
      webTv1Image : null,
      webTv2Image : null,
      init : false
    }

  }
  componentWillMount()
  {
    const {getTvLink, getDefaultUrl} = this.props;
    getTvLink(1)
    getTvLink(2)
    getDefaultUrl()
  }



  render() {

    const {sessionId, username, webTv1Url, webTv2Url,urls} = this.props
    const {setTvLink} = this.props

    //initiation des state avec les values actuelles
    if(this.state.init===false && webTv1Url !== null && webTv2Url !== null)
    {
      this.setState({
        webTv1 : webTv1Url,
        webTv2 : webTv1Url,
        messages1 : this.props.webTv1Messages,
        messages2 : this.props.webTv2Messages,
        init : true
      })
    }
    let buttonswebTv1 = [], buttonswebTv2 = []
    let imageswebTv1 =[], imageswebTv2 = []

    if(urls!==[])
    {
      urls.forEach(
        (elt)=>{
          if(elt.is_image===false)
          {
            buttonswebTv1.push(
              <Col xs={{size:4}}  lg='3'>
                <Button
                  style = {{
                    marginTop : '5px',
                    width : '110px'
                  }}
                  color = {this.state.webTv1===elt.url ? 'success':'danger'}
                  onMouseDown = {()=>{
                    setTvLink(1, elt.url, null, this.state.messages1,1)
                    this.setState({
                      webTv1 : elt.url
                    })
                  }}
                  >{elt.name}
                </Button>
              </Col>
            )

            buttonswebTv2.push(
              <Col xs='4' lg='3'>
                <Button
                  style = {{
                    marginTop : '5px',
                    width : '110px'
                  }}
                  color = {this.state.webTv1===elt.url ? 'success':'danger'}
                  onMouseDown = {()=>{
                    setTvLink(2, elt.url, null, this.state.messages2,1)
                    this.setState({
                      webTv1 : elt.url
                    })
                  }}
                  >{elt.name}
                </Button>
              </Col>
            )
          }
          else {
            imageswebTv1.push(
              <Col xs={{size:4}}  lg='3'>
                <img
                  src = {elt.url}
                  style = {
                  {
                    marginTop : '5px',
                    height : 'auto',
                    width : '110px',
                  }

                }
                  onMouseDown = {()=>{
                    setTvLink(1, null, elt.url, this.state.messages1,0)
                  }}
                  ></img>
              </Col>
            )

            imageswebTv2.push(
              <Col xs='4' lg='3'>
                <img
                  src = {elt.url}
                  style = {{
                    marginTop : '5px',
                    height : 'auto',
                    width : '110px'
                  }}
                  onMouseDown = {()=>{
                    setTvLink(2, null, elt.url, this.state.messages1, 0)
                  }}
                  ></img>
              </Col>
            )

          }

        }
      )
    }


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
              <Col xs={{size:6, offset:0}} lg={{size:5}} >
                <Row>
                  <Col xs={{size:12}}>
                    <h3>Pic Salle</h3>

                  </Col>

                </Row>

                <Row>
                  <Col xs={{size:12, offset:0}}>
                    <InputGroup>
                      <Col xs={{size:1}} lg={{size:1}}>
                        <InputGroupAddon
                          style={{
                            marginTop : '5px'
                          }}
                          addonType="prepend">@</InputGroupAddon>
                      </Col>
                      <Col xs={{size:11}} lg={{size:7}}>
                        <Input
                          placeholder={webTv1Url}
                          style={{
                            marginTop : '5px'
                          }}
                          onChange = {(e)=>this.setState({webTv1:e.target.value})}
                          />{' '}
                      </Col>

                      <Col xs={{size:12}} lg={{size:4}}>
                        <Button
                          style={{
                            marginRight : '5px',
                            marginTop : '5px'
                          }}
                          onMouseDown = {()=>{
                            setTvLink(1, this.state.webTv1, null, this.state.messages1,1)
                          }}
                          >
                          Envoyer
                        </Button>
                        <Button
                          style={{
                            marginTop : '5px'
                          }}
                          color={this.state.messages1 === true ? 'success' : 'danger'}
                          onMouseDown = {()=>{this.setState({messages1:!this.state.messages1})}}
                          >
                          Messages
                        </Button>
                      </Col>

                    </InputGroup>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col xs={{size:8}} lg={{size:4, offset:3}}>
                    <Input
                      type='file'
                      onChange = {(e)=>this.setState({webTv1Image:e.target.files[0]})}
                      ></Input>
                  </Col>
                  <Col xs={{size:4}} lg={{size:4}}>
                    <Button color='success'
                      onMouseDown = {()=>{
                        setTvLink(1, null, this.state.webTv1Image, this.state.messages1,1)
                      }}
                      >Valider</Button>
                  </Col>
                </Row>
                <br></br>

                <Row>
                  {buttonswebTv1}
                </Row>


                <br></br>

                <Row>
                  {imageswebTv1}
                </Row>
                </Col>


                <Col xs={{size:6, offset:0}} lg={{size:5, offset:2}}>
                  <Row>
                    <Col xs={{size:12}}>
                      <h3>Pic Bar</h3>

                    </Col>

                  </Row>

                  <Row>
                    <Col xs={{size:12, offset:0}}>
                      <InputGroup>
                        <Col xs={{size:1}} lg={{size:1}}>
                          <InputGroupAddon
                            style={{
                              marginTop : '5px'
                            }}
                            addonType="prepend">@</InputGroupAddon>
                        </Col>
                        <Col xs={{size:11}} lg={{size:7}}>
                        <Input
                          placeholder={webTv2Url}
                          style={{
                            marginTop : '5px'
                          }}


                          onChange = {(e)=>this.setState({webTv2:e.target.value})}
                          />
                      </Col>
                      <Col xs={{size:12}} lg={{size:4}}>
                          <Button
                            style={{
                              marginRight : '5px',
                              marginTop : '5px'

                            }}

                            onMouseDown = {()=>{
                              setTvLink(2, this.state.webTv2, null, this.state.messages2,1)

                            }}
                            >

                            Envoyer
                          </Button>
                          <Button
                            style={{
                              marginTop : '5px'
                            }}
                            color={this.state.messages2 === true ? 'success' : 'danger'}
                            onMouseDown = {()=>{
                              this.setState({messages2:!this.state.messages2})
                            }}
                            >
                            Messages
                          </Button>
                        </Col>
                      </InputGroup>

                    </Col>

                  </Row>

                  <br></br>

                    <Row>
                      <Col xs={{size:8}} lg={{size:4, offset:3}}>
                        <Input
                          type='file'
                          onChange = {(e)=>this.setState({webTv2Image:e.target.files[0]})}
                          ></Input>
                      </Col>
                      <Col xs={{size:4}} lg={{size:4}}>
                        <Button color='success'
                          onMouseDown = {()=>{
                            setTvLink(2, null, this.state.webTv2Image, this.state.messages2,1)
                          }}
                          >Valider</Button>
                      </Col>
                    </Row>
                    <br></br>

                  <Row>
                    {buttonswebTv2}
                  </Row>

                  <br></br>

                  <Row>
                    {imageswebTv2}
                  </Row>



                  </Col>

            </Row>

            <Row style = {{marginBottom : '1vh'}}>

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
    webTv1Messages : state.admin.webTv1Messages || false,
    webTv2Messages : state.admin.webTv2Messages || false,
    urls : state.admin.urls || []

  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getTvLink : (idTv)=>dispatch(getTvLink(idTv)),
    setTvLink : (idTv, url, photo, messages, is_new)=>dispatch(setTvLink(idTv,url, photo, messages, is_new)),
    getDefaultUrl : ()=>dispatch(getDefaultUrl())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWebTvContent);
