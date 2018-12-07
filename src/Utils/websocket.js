import React, { Component } from 'react';
import Websocket from 'react-websocket';
import { connect } from 'react-redux';
import {
  badgeuseIsPresent, setUserConnected, getUserUid, setTransaction, getClientUid, getInformation,
} from '../actions';

class WebSocketConnexion extends Component {
  render() {
    const { badgeuseIsPresent, getUserUid, getClientUid } = this.props;
    const { setTransaction, getInformation } = this.props;
    const { badgeuse, connected } = this.props;
    const {
      selectedArticles, sessionId, activePanel,
    } = this.props;
    return (
      <Websocket
        url="ws://localhost:9191/events"
        onMessage={(data) => {
          if (badgeuse === true) {
            if (connected === false) {
              getUserUid(data.substr(13, data.length));
            } else if (activePanel === 'Vente') {
              if (selectedArticles.length > 0) {
                getClientUid(data.substr(13, data.length));
                setTransaction(sessionId, selectedArticles, data.substr(13, data.length));
              } else {
                getClientUid(data.substr(13, data.length));
                getInformation(sessionId, data.substr(13, data.length));
              }
            }else if (activePanel === "Admin") {
              getClientUid(data.substr(13, data.length));
              getInformation(sessionId, data.substr(13, data.length));
            }
          }
        }}
        onOpen={() => {
          badgeuseIsPresent(true);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  // mettre ce qu'on veut faire passer en props du composant
  badgeuse: state.cas.badgeuse || null,
  connected: state.cas.connected || false,
  sessionId: state.cas.sessionId || null,
  selectedArticles: state.vente.selectedArticles || [],
  clientUid: state.achats.clientUid || null,
  activePanel: state.general.activePanel || null,
});

const mapDispatchToProps = dispatch => ({
  badgeuseIsPresent: data => dispatch(badgeuseIsPresent(data)),
  setUserConnected: login => dispatch(setUserConnected(login)),
  getUserUid: uid => dispatch(getUserUid(uid)),
  getClientUid: uid => dispatch(getClientUid(uid)),
  setTransaction: (session, list, uid) => dispatch(setTransaction(session, list, uid)),
  getInformation: (session, uid) => dispatch(getInformation(session, uid)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebSocketConnexion);
