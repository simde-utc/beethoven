import React, { Component } from 'react';
import '../../../App.css';
import {connect} from 'react-redux'

import {InputGroup, InputGroupAddon, InputGroupText, Input, Button,ButtonGroup, Label} from 'reactstrap'
import {Table} from 'reactstrap'
import { Container, Col, Row } from 'reactstrap';


import {getGoodies, addAlert} from '../../../actions'
class AdminGoodiesContent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      dateDebut : null,
      dateFin: null,
      quantite: null
    }

  }
  componentWillMount()
  {
  }





  render() {
    const {goodiesList} = this.props;

    let myList = [];
    if(goodiesList.length !== 0)
    {
      myList.push(
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
          </tr>

        </thead>
      )


      for(let i=0; i<this.state.quantite; i++){
        if(i<goodiesList.length)
        {
          myList.push(
            <tr>
              <td>{goodiesList[i].lastname}</td>
              <td>{goodiesList[i].firstname}</td>
            </tr>
          )
        }
      }
    }


    return(
      <div className ="AdminPanel">
        <Container fluid>
          <Row>
            <Col xs={{size:10, offset:1}} lg={{offset:3,size:6}}>
              <Row>
                <Col size='12'>
                  <br></br>
                  <h2>Gestion des Gagnants de goodies</h2>
                  <br></br>
                </Col>
              </Row>

              <Row>

                <Col lg={{size:6, offset:0}} xs={{size:6, offset:3}}>
                  <InputGroup>
                        <InputGroupAddon addonType="prepend">Date début</InputGroupAddon>
                        <Input
                          placeholder='Date de début'
                          type='date'
                          onChange = {(e)=>this.setState({dateDebut:e.target.value})}
                          />
                  </InputGroup>
                  <br></br>
                  </Col>

                  <Col lg={{size:6, offset:0}} xs={{size:6, offset:3}}>
                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Date début</InputGroupAddon>
                          <Input
                            placeholder='Date de début'
                            type='date'
                            onChange = {(e)=>this.setState({dateFin:e.target.value})}

                            />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{size:6, offset:3}} lg={{size:12, offset:0}}>
                    <br></br>
      <InputGroup>
                          <InputGroupAddon addonType="prepend">Quantité</InputGroupAddon>
                          <Input
                            placeholder='quantité'
                            type='number'
                            onChange = {(e)=>this.setState({quantite:e.target.value})}
                            />
                    </InputGroup>
                  </Col>
                </Row>
              <Row>
                <br></br>

                  <Col xs='12'>
                    <br></br>
                    <ButtonGroup>
                      <br></br>
                      <Button
                        onClick = {()=>{
                          //function
                          this.props.getGoodies(this.state.dateDebut, this.state.dateFin, this.state.quantite)

                        }}

                        >
                        Reccupérer la liste
                      </Button>
                    </ButtonGroup>
                  </Col>

              </Row>


            </Col>

          </Row>
          <Row>

            <Col xs={{size:10, offset:1}} lg={{size:6, offset:3}}>
              <br></br>
              <Table>
                {myList}

              </Table>
            </Col>

          </Row>



        </Container>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    goodiesList : state.admin.goodiesList || []

  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getGoodies : (dateDebut, dateFin, quantite) => dispatch(getGoodies(dateDebut, dateFin, quantite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminGoodiesContent);
