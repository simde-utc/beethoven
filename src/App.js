import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import Body from './body';
import MenuBody from './Menu/menu';


class App extends Component {

    constructor(props){
        super(props)
        this.state = {
        cas_ticket: null
        }
    }
    check_cas_ticket(){
        if (this.state.cas_ticket==null){
            window.location.href = 'https://cas.utc.fr/cas/login?service=http://beethoven.picasso-utc.fr?task=login';
            let ticket = getTicket(window.location.href);
            this.setState({cas_ticket: ticket})
        }
    }
    getTicket(url){
      let ticketRegex = /(\?|&)ticket=([^&=]+)/;
      if(ticketRegex.test(url)){
        let match = ticketRegex.exec(url);
        return match[2];
       }
    }

    render() {
    this.check_cas_ticket()
    return (
      <div className="App">
        <Header></Header>
        <MenuBody></MenuBody>
      </div>
    );
    }
}

export default App;
