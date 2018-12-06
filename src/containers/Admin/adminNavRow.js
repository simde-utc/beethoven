import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'


import {Col, Row } from 'reactstrap';

import {updateAdminNav, setTvLink} from '../../actions'
import Hidden from '@material-ui/core/Hidden'
class AdminNavRow extends Component {
  render() {
    const {AdminNav} = this.props
    const {updateAdminNav} = this.props
    return(
      <div
        className ="AdminNavRow"

        style = {
          {
            color : 'black'
          }
        }
        >
        <Row
          href='#'
          focus = {this.props.index === AdminNav}
          style = {
            this.props.index === AdminNav ?
            {
              backgroundColor:'#B22132',
              padding : '5px',
              textAlign : 'left',
              color:'#e9e9e9',
            }:
            {
              backgroundColor:'',
              padding : '5px',
              textAlign : 'left',
              color: 'black',

            }
          }

          active = {this.props.index   === AdminNav}
          onClick = {()=>{
            updateAdminNav(this.props.index)
//            setTvLink(1, "http://assos.utc.fr/", true)
//            setTvLink(2, "http://beethoven.picasso-utc.fr/NextMenus", true)



          }}

          >
          {this.props.logo!=="" && <Col md='12' lg='3' sm='12' xs='12'>{this.props.logo}</Col>}
          <Hidden mdDown>
            <Col   lg='9' xl='9'>{this.props.nom}</Col>
          </Hidden>


        </Row>

      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    AdminNav : state.admin.AdminNav || null
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    updateAdminNav : (id)=>dispatch(updateAdminNav(id)),
    setTvLink : (idTv, url, messages)=>dispatch(setTvLink(idTv,url,messages))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNavRow);
