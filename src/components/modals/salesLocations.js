import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "semantic-ui-react";
import "./css/modals-pixel.scss";
import { SalesLocation } from "../../models";
import {
  salesLocations as salesLocationsAPI,
  categories as categoriesAPI,
  articles as articlesAPI,
} from "../../api/state";
import { refreshUser } from "../../api/connect";
import { useDispatch } from "react-redux";

const SalesLocationsModal = ({ open, locations }) => {

  const dispatch = useDispatch();
  const fetchWeezDatas = React.useCallback(() => {
    dispatch(refreshUser());
    dispatch(categoriesAPI.list());
    dispatch(articlesAPI.list());
  }, [dispatch]);

  const setCurrentLocation = React.useCallback((id) => dispatch(salesLocationsAPI.setCurrent(id)), [dispatch]);

  React.useEffect(() => {
    if(open === true) {
      fetchWeezDatas();
    }
  }, [open, fetchWeezDatas]);

  return (
    <Modal
      open={open}
      centered={false}
      size="tiny"
      >
      <Modal.Header className="modal-header">
        - Choix du mode de vente -
      </Modal.Header>
      <Modal.Content className="modal-container">
        <div className="modal-description">
          Choisissez un mode pour la vente.
        </div>
        <div className="modal-sales-locations">
          {
            locations.map(item => (
              <Button
                className="location-button"
                key={ item.getKey() }
                onClick = { () => setCurrentLocation(item.getKey()) }
                >
                {item.getName()}
              </Button>
            ))
          }
        </div>
      </Modal.Content>
    </Modal>
  )
}

SalesLocationsModal.propTypes = {
  open: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.instanceOf(SalesLocation))
}

SalesLocationsModal.defaultProps = {
  open: false,
  locations: [],
}
export default SalesLocationsModal;
