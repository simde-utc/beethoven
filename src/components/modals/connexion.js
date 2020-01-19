import React from "react";
import PropTypes from "prop-types";
import { Modal, Input, Button, Loader } from "semantic-ui-react"
import WebSocket from "react-websocket";
import { WEBSOCKET_URL } from "../../config";
import "./css/modals.scss";
import { isPending, badgeAuth, usernameAuth } from "../../api/connect";
import { useSelector, useDispatch } from "react-redux";

const ConnexionManager = ({ open }) => {
  const [reader, setReader] = React.useState(false);
  const [webData, setWebData] = React.useState(null);

  const { pending } = useSelector(state => ({ pending: isPending(state) }));
  return (
    <React.Fragment>
      <WebSocket
        url={ WEBSOCKET_URL }
        onMessage={ (data) => setWebData(data.substr(13, data.length))}
        onOpen = {() => setReader(true)}
        onClose={() => setReader(false)}
        />
      { renderModal(reader, open, pending, webData, setWebData) }
    </React.Fragment>

  )
}

ConnexionManager.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default ConnexionManager;


/**
 * Render a different modal if there is or not a reader connected
 * @param {boolean} reader - The presence of the reader
 * @param {boolean} open - boolean to check if we open the modal
 * @returns {function} the component
**/
const renderModal = (reader, open, pending, webData, setWebData) => {
  const Content = reader ? BadgeConnexionModal : SimpleConnexionModal;
  return (
    <Modal
      open={open}
      centered={false}
      size="mini"
      >
      <Modal.Header className="modal-header">
        - Connexion -
      </Modal.Header>
      <Modal.Content>
        {
          pending ?
          <div className="modal-container"><Loader/></div>
          :
          <Content webData={webData} setWebData={setWebData}/>
        }
      </Modal.Content>
    </Modal>
  );
}

const SimpleConnexionModal = () => {
  const [data, setData] = React.useState({});

  const dispatch = useDispatch();
  const login = React.useCallback((data) => {
    dispatch(usernameAuth(data));
    setData({});
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="modal-container">
        <div className="simple-modal-description">
          Veuillez entrer votre login et votre pin pour vous connecter
        </div>
        <Input
          placeholder="Username"
          className="modal-input"
          onChange = { (_, {value}) => setData({...data, username: value}) }
          />
        <Input
          placeholder="Pin"
          className="modal-input"
          type = "password"
          onChange = { (_, {value}) => setData({...data, pin: value}) }
          />
          <Button
            color="green"
            disabled={ Boolean(!data || !data.username || !data.pin)}
            onClick={() => login(data)}
            >
            Se Connecter
          </Button>

      </div>
    </React.Fragment>
  )
}

const BadgeConnexionModal = ({ webData, setWebData }) => {
  const [pin, setPin] = React.useState("");

  const pushPin = React.useCallback((n) => setPin(`${pin}${n}`), [setPin, pin]);

  const dispatch = useDispatch();
  const login = React.useCallback((data) => {
    dispatch(badgeAuth(data));
    setPin("");
    setWebData(null);
  }, [dispatch, setWebData]);

  React.useEffect(() => {
    if(pin.length === 4 && webData){
      login({ "badge_id": webData, pin });
    }
  }, [pin, login, webData])

  return (
    <React.Fragment>
      <div className="modal-container">
        <div className="modal-description">
          Veuillez passer votre badge pour vous connecter.
        </div>
        <div>
          Pin: { Array(pin.length + 1).join("*") }
        </div>
        {
          webData ?
        <div className="modal-pad">
            <div className="pad-row">
              <Button className="pad-button" color="grey" onClick={() => pushPin(1)}>1</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(2)}>2</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(3)}>3</Button>
            </div>
            <div className="pad-row">
              <Button className="pad-button" color="grey" onClick={() => pushPin(4)}>4</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(5)}>5</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(6)}>6</Button>
            </div>
            <div className="pad-row">
              <Button className="pad-button" color="grey" onClick={() => pushPin(7)}>7</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(8)}>8</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(9)}>9</Button>
            </div>
            <div className="pad-row">
              <Button className="pad-button" color="grey" onClick={() => pushPin('#')}>#</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin(0)}>0</Button>
              <Button className="pad-button" color="grey" onClick={() => pushPin('*')}>*</Button>
            </div>
            <Button color="red" onClick={() => setPin("") }>Supprimer Pin</Button>
          </div>
          : null
          }

      </div>
    </React.Fragment>
  )
}

BadgeConnexionModal.propTypes = {
  webData: PropTypes.string,
  setWebData: PropTypes.func.isRequired,
}

BadgeConnexionModal.defaultProps = {
  webData: null
}
