import React, { Component } from 'react';
import './App.css';

{/*Fichier de connexion au CAS*/}

{/*Fonction pour transmettre le ticket à la classe de connection au cas*/}
function setTicket(ticket){
    this.setState({ticket})
}

{/*Récupérer le ticket de l'url*/}
function getTicket(url){
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(url)){
    let match = ticketRegex.exec(url);
    return match[2];
   }
}

{/*Retour du ticket*/}
function check_cas_ticket(){
        let ticket = getTicket(window.location.href);
        return ticket;
}

{/*Classe qui choppe le ticket et le redirige vers la classe de connection*/}
class CasTicket extends Component {
  constructor(props){
      super(props)
      this.state = {
      loaded: false
      }
      this.redir = this.redir.bind(this);
  }
  redir() {
    if(this.state.loaded==false){
      let tickt = check_cas_ticket();
      setTicket(tickt)
      this.setState({loaded: true})
    }else{
    }
  }
  render() {
    this.redir()
    return (
      <div>

      </div>
    );
  }
}


{/*Classe permettant la connection au CAS et récupération du sessionid dans le state*/}
class GetSessionId extends Component {
  constructor(props){
      super(props)
      this.state = {
        ticket: null,
        sessionid: null
      }
      setTicket = setTicket.bind(this);
  }
  getCasUrl(tick){
    if(tick){
      let serviceurl = 'http://beethoven.picasso-utc.fr'
      fetch("https://api.nemopay.net/services/MYACCOUNT/loginCas2?system_id=payutc&app_key=31f5809f43b3161dd8aefb7a79a5fc55", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Nemopay-Version': '2018-07-03',
      },
      body:  '{"ticket":"'+tick+'","service":"'+serviceurl+'"}',
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('log VIA CAS effect')
          this.setState({sessionid: result.sessionid})
      },
        (error) => {
         ('La ça bug un peu')
      })
    }
  }
  render() {
    if(this.state.ticket!==null && this.state.sessionid==null){
      this.getCasUrl(this.state.ticket);
    }
    return (
      <div>
      </div>
    );
  }
}

{/*Classe finale combinant les 2 précédentes*/}
class CasConnection extends Component {
  render() {
    return (
      <div>
        <GetSessionId></GetSessionId>
        <CasTicket></CasTicket>
      </div>
    );
  }
}

export default CasConnection;
