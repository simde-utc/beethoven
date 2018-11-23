import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import { Container, Col, Row } from 'reactstrap';


import MenuNav from './menuNav'
import MenuList from './menuList'



class MenuBody extends Component {
  render() {
    const {sessionId, username} = this.props
    return (
      <div className="MenuBody"
        style={{
          backgroundColor : '#000223',
          height : '100vh'
        }}

        >
        {sessionId !== null && username!==null ?
          <Container fluid>
            <Row>
            <Col md="3" style={{padding:'0px'}}> <MenuNav/></Col>
            <Col md="9"> <MenuList/></Col>
            </Row>
          </Container> :
          ""
        }



      </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant

    sessionId : state.cas.sessionId || null,
    username : state.cas.username || null,
  };
}


export default connect(
  mapStateToProps
)
(MenuBody);
