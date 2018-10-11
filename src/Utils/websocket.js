import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {connect} from 'react-redux';
import {badgeuseIsPresent, setUserConnected, getUserUid} from '../actions'

class WebSocketConnexion extends Component{
  render(){
    const {badgeuseIsPresent, getUserUid} = this.props;
    const {badgeuse, connected} = this.props;
    return(
      <Websocket
        url='ws://localhost:9191/events'
        onMessage={(data)=>{
          if(badgeuse===true)
          {
            if(connected===false)
            {
              getUserUid(data.substr(13,data.length))
            }
            else {
              console.log(data)
            }
          }
        }}
        onOpen = {()=>{
          badgeuseIsPresent(true);
        }}
        onClose = {()=>{
          badgeuseIsPresent(false);
        }}
        >
      </Websocket>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    badgeuse : state.utils.badgeuse || null,
    connected : state.utils.connected || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    badgeuseIsPresent : (data)=> dispatch(badgeuseIsPresent(data)),
    setUserConnected : (login)=>dispatch(setUserConnected(login)),
    getUserUid : (uid)=>dispatch(getUserUid(uid))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocketConnexion);
