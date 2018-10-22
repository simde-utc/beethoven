import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {connect} from 'react-redux';
import {badgeuseIsPresent, setUserConnected, getUserUid, setTransaction, getClientUid, getInformation} from '../actions'

class WebSocketConnexion extends Component{
  render(){
    const {badgeuseIsPresent, getUserUid} = this.props;
    const {setTransaction, getInformation} = this.props;
    const {badgeuse, connected} = this.props;
    const {selectedArticles,sessionId, clientUid} = this.props
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
              if(selectedArticles.length>0){
                let client = getClientUid(data.substr(13,data.length));
                setTransaction(sessionId,selectedArticles,client);
              }else{
                let client = getClientUid(data.substr(13,data.length));
                getInformation(sessionId,client);
              }
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
    badgeuse : state.cas.badgeuse || null,
    connected : state.cas.connected || false,
    sessionId : state.cas.sessionId || null,
    selectedArticles : state.vente.selectedArticles || [],
    clientUid : state.achats.clientUid || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    badgeuseIsPresent : (data)=> dispatch(badgeuseIsPresent(data)),
    setUserConnected : (login)=>dispatch(setUserConnected(login)),
    getUserUid : (uid)=>dispatch(getUserUid(uid)),
    getClientUid : (uid)=>dispatch(getClientUid(uid)),
    setTransaction : (session,list,uid)=>dispatch(setTransaction(session,list,uid)),
    getInformation : (session,uid)=>dispatch(getInformation(session,uid))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocketConnexion);
