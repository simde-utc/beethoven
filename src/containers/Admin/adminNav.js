import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'

import {Nav} from 'reactstrap';
import {MdTv} from 'react-icons/md'

import AdminNavRow from './adminNavRow'
class AdminNav extends Component {
  render() {
    let myRows = [
      {logo:"MdTv", nom : 'WebTVs'},
    ]

    let dataToStore = []
    myRows.forEach(function(elt, id){
      console.log(id)

      switch(elt.logo)
      {
        case "MdTv":
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<MdTv size="2em"></MdTv>} nom={elt.nom}></AdminNavRow>
          )
        break;

        default:
        dataToStore.push(
            <AdminNavRow index = {id+1} logo="" nom={elt.nom}></AdminNavRow>
          )
        break;
      }
    })

    return(
      <div
        className ="AdminNav"
        style =
        {{
          paddingTop:'20px',
          color : 'black',
          backgroundColor:'#e9e9e9',
        }}
        >

        <Nav vertical>
          {dataToStore}
        </Nav>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue

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
)
(AdminNav);
