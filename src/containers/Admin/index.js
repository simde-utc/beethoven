import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import { Container, Col, Row } from 'reactstrap';

import AdminNav from './adminNav'
import AdminWebTvContent from './AdminContents/adminWebTvContent'
import AdminMessagesContent from './AdminContents/adminMessagesContent'


import {getRights} from '../../actions'
class AdminPanel extends Component {

  componentDidMount(){
  
  }

  render() {
    const {sessionId, username, adminIndex, rightsList } = this.props
    const {getRights} = this.props;
    return(
      <div
        className ="AdminPanel"
        >
        {sessionId!== null && username !== null && rightsList !== []  ?
          <Container fluid>
            <Row>
              <Col
                md="1"

                style = {{

                  padding:'0px'
                }}
                ><AdminNav></AdminNav> </Col>
              <Col md="11">



                {adminIndex===1 && <AdminWebTvContent/>}
                {adminIndex===2 && <AdminMessagesContent/>}
              </Col>
            </Row>
          </Container>
          :
          ""
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
    adminIndex : state.admin.AdminNav || null,
    rightsList : state.cas.rightsList || []
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    getRights : (sessionid)=> dispatch(getRights(sessionid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminPanel);
