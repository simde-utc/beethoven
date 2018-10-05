import React, { Component } from 'react';
import '../../App.css';
import { Container, Col, Row } from 'reactstrap';


import MenuNav from './menuNav'
import MenuList from './menuList'



class MenuBody extends Component {
  render() {
    return (
      <div
        className="MenuBody"
        style = {{paddingTop : '20px'}}
        >

        <Container fluid>
          <Row>
          <Col md="3"> <MenuNav/></Col>
          <Col md="9"> <MenuList/></Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default MenuBody;
