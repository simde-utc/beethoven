import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './Menu/menu';



function setTicket(ticket){
    this.setState({ticket})
}


function getTicket(url){
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(url)){
    let match = ticketRegex.exec(url);
    return match[2];
   }
}

function getCasUrl(tick){
  let casurl = 'https://cas.utc.fr/cas/'
  let serviceurl = 'http://beethoven.picasso-utc.fr/'
  fetch('https://api.nemopay.net/services/ROSETTINGS/getCasUrl?system_id=payutc&app_key=31f5809f43b3161dd8aefb7a79a5fc55',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Nemopay-Version': '2018-07-03',
        },
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          fetch("https://api.nemopay.net/services/MYACCOUNT/loginCas2?system_id=payutc&app_key=31f5809f43b3161dd8aefb7a79a5fc55", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Nemopay-Version': '2018-07-03',
          },
          body: JSON.stringify({
              ticket: tick,
              service: serviceurl
          }),
          })
          .then(res => res.json())
          .then(
              (result) => {
              console.log('log VIA CAS effect')
              console.log(result)
          },
          (error) => {
             ('La ça bug un peu')
          })







        },
        (error) => {
          ('Problem1')
      });

}


function connectToCas(t){
  getCasUrl(t);
}


function check_cas_ticket(){
        let ticket = getTicket(window.location.href);
        return ticket;
}

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
      console.log('Cst okokokokookok')
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

class CasConnection extends Component {
  constructor(props){
      super(props)
      this.state = {
        ticket: null
      }
      setTicket = setTicket.bind(this);
  }
  componentDidMount(){
    console.log(this.state.ticket);
  }
  render() {
    if(this.state.ticket!==null){
      connectToCas(this.state.ticket);
    }
    console.log(this.state.ticket);
    return (
      <div>
      </div>
    );
  }
}

class App extends Component {
    render() {
      getCasUrl();
      return (
        <div className="App">
          <Header></Header>
          <MenuBody></MenuBody>
          <CasConnection></CasConnection>
          <CasTicket></CasTicket>
        </div>
      );
    }
}

export default App;
