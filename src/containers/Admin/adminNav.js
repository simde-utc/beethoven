import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'

import {MdTv, MdMessage, MdPhoto, MdCardGiftcard, MdPhotoLibrary} from 'react-icons/md'
import {FaMedal} from 'react-icons/fa'
import { Container} from 'reactstrap';


import AdminNavRow from './adminNavRow'
class AdminNav extends Component {
  render() {
    let myRows = [
      {logo:"MdTv", nom : 'WebTVs'},
      {logo:"MdPhotoLibrary", nom:'Multi-Info'},
      {logo:'MdMessage', nom : 'Messages'},
      {logo:'MdPhoto', nom : 'Images'},
      {logo: 'MdCardGiftcard', nom : 'Gestion Carte'},
      {logo:'FaMedal', nom: 'Goodies'}
    ]

    let dataToStore = []
    myRows.forEach(function(elt, id){
      switch(elt.logo)
      {
        case "MdTv":
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<MdTv size="2em"></MdTv>} nom={elt.nom}></AdminNavRow>
          )
        break;

        case "MdPhotoLibrary":
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<MdPhotoLibrary size="2em"></MdPhotoLibrary>} nom={elt.nom}></AdminNavRow>
          )
        break;

        case "MdMessage":
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<MdMessage size="2em"></MdMessage>} nom={elt.nom}></AdminNavRow>
          )
        break;

        case "MdPhoto":
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<MdPhoto size="2em"></MdPhoto>} nom={elt.nom}></AdminNavRow>
          )
        break;
        case "MdCardGiftcard":
        dataToStore.push(
          <AdminNavRow index = {id+1} logo={<MdCardGiftcard size="2em"></MdCardGiftcard>} nom={elt.nom}></AdminNavRow>
        )
        break;
        case 'FaMedal':
        dataToStore.push(
            <AdminNavRow index = {id+1} logo={<FaMedal size="2em"></FaMedal>} nom={elt.nom}></AdminNavRow>
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
        <Container>
          {dataToStore}
        </Container>
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
)(AdminNav);
