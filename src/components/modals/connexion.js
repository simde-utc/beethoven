import React from "react";
import PropTypes from "prop-types";
import { Modal, Input, Button } from "semantic-ui-react";
import "./css/modals-pixel.scss";
import { badgeAuth, usernameAuth, isPending } from "../../api/connect";
import { getData, deleteData } from "../../api/internal";
import { useDispatch, useSelector } from "react-redux";

const ConnexionManager = ({ open }) => {

  const {
    reader,
    connexionBadge,
    pending
  } = useSelector(state => ({
    reader: getData(state, 'reader'),
    connexionBadge: getData(state, 'connexionBadge'),
    pending: isPending(state)
  }));

  const renderContent = React.useCallback((connexionBadge) => {
    if(pending) {
      return <div className="connect-pending">Connexion en cours...</div>
    }
    return reader ? <BadgeConnexionModal connexionBadge={connexionBadge}/> : <SimpleConnexionModal/>;
  }, [pending, reader]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        centered={false}
        size="mini"
        >
        <Modal.Header className="modal-header">
          - Connexion -
        </Modal.Header>
        <Modal.Content className="modal-container">
            {renderContent(connexionBadge)}
        </Modal.Content>
      </Modal>
    </React.Fragment>

  )
}

ConnexionManager.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default ConnexionManager;


const SimpleConnexionModal = () => {
  const [data, setData] = React.useState({});

  const dispatch = useDispatch();
  const login = React.useCallback((data) => {
    dispatch(usernameAuth(data));
    setData({})
  }, [dispatch]);

  return (
    <React.Fragment>
      <div>
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

const BadgeConnexionModal = ({ connexionBadge }) => {
  const [pin, setPin] = React.useState("");

  const pushPin = React.useCallback((n) => setPin(`${pin}${n}`), [setPin, pin]);

  const dispatch = useDispatch();
  const login = React.useCallback((data) => {
    dispatch(badgeAuth(data));
    setPin("");
    dispatch(deleteData('connexionBadge'))
  }, [dispatch, setPin]);

  React.useEffect(() => {
    if(pin.length === 4 && connexionBadge){
      login({ "badge_id": connexionBadge, pin });
    }
  }, [pin, login, connexionBadge])

  return (
    <React.Fragment>
      <div>
        <div className="modal-description">
          Veuillez passer votre badge pour vous connecter.
        </div>
        {
          connexionBadge ?
          <React.Fragment>
            <div>
              Pin: { Array(pin.length + 1).join("*") }
            </div>
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
          </React.Fragment>

          : null
          }

      </div>
    </React.Fragment>
  )
}

BadgeConnexionModal.propTypes = {
  connexionBadge: PropTypes.string,
}

BadgeConnexionModal.defaultProps = {
  connexionBadge: null
}
