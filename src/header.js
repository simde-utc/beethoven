import React, { Component } from 'react';
import './App.css';

import MenuBody from './containers/Menu/menu'
import Vente from './containers/Vente/vente'
import AdminPanel from './containers/Admin'
import {connect} from 'react-redux'
import { Button } from 'reactstrap';

import {FUND_ID} from './Utils/config'

import {
  login,
  redirectLogin,
  deleteError,
  restart,
  deleteAlert,
  getRights,
  addAlert,
  changePanel,
  disconnect,
  ginger
} from './actions'
import {printAlert} from './Utils/utils'
import {CAS_LINK} from './Utils/config'
import BadgeConnexion  from './Utils/badgeConnexion'
import SimpleConnexion from './Utils/simpleConnexion'
import WebSocketConnexion from './Utils/websocket'
import TypeEvents from './Utils/typeEvents.js'
import {checkRights, deleteCookies} from './Utils/utils'


import {gingerApiRequest} from './Utils/apiCalls'
class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      denieAccess : false
    }
  }

  componentDidMount() {


    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString().split(" ")[2]
      })
    },1000)
  }



  render() {
    const {alertList, badgeuse, redirected, rightsList} = this.props;
    const {deleteError, redirectLogin, login, restart, getRights, addAlert} = this.props;
    const{sessionId, connected, username} = this.props;
    const {event_id, picked} = this.props


    //affichage de l'ensemble des erreurs du programme
    let ListAlerts = []
    if(alertList.length > 0)
    {
      alertList.forEach((element)=>{
        ListAlerts.push(printAlert(element.type, element.message))
      })
    }




    let affichage=null;
    switch(this.props.activePanel){
      case 'Vente':
        if(sessionId!==null && picked==true && rightsList!==null)
        {

          if(rightsList[FUND_ID]!== undefined && checkRights(rightsList[FUND_ID], ['POSS3'])
          || 
          rightsList[0]!== undefined && checkRights(rightsList[0], ['POSS3'])
        )
          {
            affichage = <Vente></Vente>
            if(this.state.denieAccess){
                this.setState({denieAccess:false})
            }
          }
          else if(!this.state.denieAccess){
            addAlert('danger', 'Erreur : Vous n\' avez pas les droits requis')
            this.setState({denieAccess:true})
        }
        }
        break;
      case 'Menu':
        if(sessionId!==null && rightsList!==null)
        {
          if(rightsList[FUND_ID]!== undefined && checkRights(rightsList[FUND_ID], ['POSS3'])
          || 
          rightsList[0]!== undefined && checkRights(rightsList[0], ['POSS3'])
        )
          {
          affichage = <MenuBody></MenuBody>
            if(this.state.denieAccess){
              this.setState({denieAccess:false})
          }
        }
          else if(!this.state.denieAccess){
            addAlert('danger', 'Erreur : Vous n\' avez pas les droits requis')
            this.setState({denieAccess:true})
        }
        }
        break;

      case 'Admin':
        if(sessionId!==null && rightsList!==null)
        {
          if(rightsList[FUND_ID]!== undefined && checkRights(rightsList[FUND_ID], ['ADMINRIGHT'])
          || 
          rightsList[0]!== undefined && checkRights(rightsList[0], ['ADMINRIGHT'])
        )
          {
          affichage = <AdminPanel></AdminPanel>
            if(this.state.denieAccess){
              this.setState({denieAccess:false})
          }

          }
          else if(!this.state.denieAccess){
            addAlert('danger', 'Erreur : Vous n\' avez pas les droits requis')
            this.setState({denieAccess:true})
        }
        }
      default:
        break;
    }

    //tester si il est necessaire d'enregistrer les infos
    let ticketRegex = /(\?|&)ticket=([^&=]+)/;
    if(redirected===false && ticketRegex.test(window.location.href))
    {
      login();
      redirectLogin();
    }

    sessionId !== null && rightsList === null && getRights(sessionId)


    return (

      <div>
        <WebSocketConnexion></WebSocketConnexion>
        {badgeuse===true && connected===false &&<BadgeConnexion></BadgeConnexion>}
        {badgeuse===false && connected===false &&<SimpleConnexion></SimpleConnexion>}

        {connected===true && picked===false && this.props.activePanel==='Vente' && <TypeEvents></TypeEvents>}
        <div className="Header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand" onClick={()=> restart()}>Beethoven</span>
              <span className="input-group-btn">
                {username===null ?'' :
                  <span style={{color:'black'}}> {username}</span>}
              </span>" "
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              </ul>
              <span style={{color:'black', marginRight:'20px'}}> {this.state.curTime}</span>
              <Button outline color="secondary" onClick={()=>this.props.changePanel('Menu')}>Menu</Button>" "
              <Button outline color="secondary" onClick={()=>this.props.changePanel('Vente')}>Vente</Button>" "
              <Button outline color="primary" onClick={

                  ()=>{
                    this.props.disconnect()
                    this.props.changePanel('Admin')
                  }}>Admin</Button>" "
              <Button color="danger" onClick={()=>{
                  this.props.ginger(this.props.username)
                }}>Déconnexion</Button>
            </div>
          </nav>
        </div>
        <div
          style={
            {
              position:'fixed',
              top :'20px',
              right:'10px',
              width:'auto',
              zIndex:'999',
              borderRadius:'0px'
            }
          }
          >{ListAlerts}</div>
        {affichage}
      </div>

    );
  }
}

/*<WebSocketConnexion></WebSocketConnexion>
{badgeuse===true && connected===false &&<BadgeConnexion></BadgeConnexion>}
*/
let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    connected : state.cas.connected || false,
    sessionId : state.cas.sessionId || null,
    redirected : state.cas.redirected || false,
    alertList : state.alerts.alertList || [],
    badgeuse : state.cas.badgeuse || false,
    username : state.cas.username || null,
    event_id : state.vente.event_id || null,
    picked : state.vente.picked || false,
    rightsList : state.cas.rightsList || null,
    activePanel : state.general.activePanel || null,
    userInfo : state.general.userInfo || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    redirectLogin : ()=>dispatch(redirectLogin()),
    login : ()=>dispatch(login()),
    deleteAlert : ()=> dispatch(deleteAlert()),
    restart : ()=> dispatch(restart()),
    getRights : (sessionid)=>dispatch(getRights(sessionid)),
    addAlert : (status, information)=>dispatch(addAlert(status, information)),
    changePanel : (panel)=> dispatch(changePanel(panel)),
    disconnect :()=>dispatch(disconnect()),
    ginger : (login)=>dispatch(ginger(login))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
