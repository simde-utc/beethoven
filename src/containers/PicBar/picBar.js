import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import { Container, Col, Row } from 'reactstrap';
import Iframe from 'react-iframe';


import {getTvLink, setTvLink} from '../../actions'

class PicBar extends Component {
  componentWillMount()
  {

  }

  render() {
    const {tvLink} = this.props;
    const {getTvLink} = this.props;

    let marqueeList = []
    let data = [
      {title : 'Hugo', data:'#Sanji'},
      {title : 'Test', data:'Ceci est un Test.'}
    ]




    data.forEach(function(elt){
      marqueeList.push(
        <span style={
            {
              marginRight : '50px'
            }
          }><b>{elt.title} : </b> {elt.data}</span>
      )
    })
    return (
      <div
        className="PicBar"
        style= {{
          height : '90vh'
        }}
        >
        <Iframe url={tvLink}
      width = '100%'
      display="initial"
      position="relative"
      allowFullScreen/>
    <marquee
      style={
        {
          height:'9vh',
          paddingTop : '20px',
          fontSize : '2em'
        }
      }

      >
      {marqueeList}

    </marquee>
      </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant

    tvLink : state.webTV.tvLink || null,
    messages : state.webTV.username || [],
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getTvLink : (idTv)=> dispatch(getTvLink(idTv)),
    setTvLink : (idTv)=> dispatch(getTvLink(idTv)),

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(PicBar);
