import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import Iframe from 'react-iframe';

import {REFRESH_WEBTV} from '../../Utils/config'

import {getTvLink, setTvLink,  getMessagesList} from '../../actions'

class WebTV extends Component {
  componentWillMount()
  {
    const {getTvLink, getMessagesList} = this.props;
    getTvLink(this.props.tv)
    getMessagesList()
  }


  componentDidMount(){
    this.updateData()
  }

  componentWillUnMount(){
    clearInterval(this.interval)
  }

  updateData = ()=>{
    const {getTvLink, getMessagesList} = this.props;

      this.interval = setInterval(
        ()=>{

          getTvLink(this.props.tv)
          getMessagesList()
        },
        REFRESH_WEBTV
      )
  }

  render() {
    const {tvLink, enableMessages, messages} = this.props;

    let marqueeList = []


    messages.forEach(function(elt){
      marqueeList.push(
        <span style={
            {
              marginRight : '50px'
            }
          }><b>{elt.title} : </b> {elt.text}</span>
      )
    })
    return (
      <div className="webTV"
        style= {{
          height : enableMessages===true ? '89vh' : '99vh',
        }}
        >
        {tvLink !== null && tvLink.url !== null && tvLink.url !== "" &&
          <Iframe url={tvLink.url}
        width = '100%'
        height =  '99%'
        frameborder = "0"
        border = "0"
        display="initial"
        position="relative"
        allowFullScreen
        style = {{
          overflowY : 'hidden',
          overflowX : 'hidden'}
        }
        />
        }

        {/*si les images ne s'affichent pas bien sur les télés voir ici*/}
        {tvLink !== null && tvLink.photo !== null && tvLink.photo !== "" &&
          <img src={tvLink.photo} alt='Image not found'
            style={{
              'width':'auto',
              'height':'99%',
            }}
            ></img>
        }


    {enableMessages===true ?
      <marquee
        style={
          {
            height:'10vh',
            paddingTop : '20px',
            margin : '0',
            fontSize : '2em',
            color:'black',
            backgroundColor : 'white'
          }
        }

        >
        {marqueeList}

      </marquee>
      :''

    }
      </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant

    tvLink : state.webTV.tvLink || null,
    enableMessages : state.webTV.enableMessages || false,
    messages : state.webTV.messages || [],
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getTvLink : (idTv)=> dispatch(getTvLink(idTv)),
    setTvLink : (idTv)=> dispatch(setTvLink(idTv)),
    getMessagesList : ()=> dispatch(getMessagesList())

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebTV);
