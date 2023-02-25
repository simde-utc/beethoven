import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
import "./css/modals-pixel.scss";
import {
  buyerInformations as buyerInformationsAPI,
  articles as articlesAPI
} from "../../api/state";
import { useSelector, useDispatch } from "react-redux";
import { WEEZEVENT_URL } from "../../config";

/**
 * This Component manage the informations of the user
**/
const BuyerInformationsModal = () => {

  const { user, articles } = useSelector(state => ({
    user: buyerInformationsAPI.getCurrentFromState(state),
    articles: articlesAPI.getValuesFromState(state),
  }));

  const dispatch = useDispatch();
  const closeModal = React.useCallback(() => dispatch(buyerInformationsAPI.resetCurrent()), [dispatch]);

  /**
   * Method to cancel a purchase
   * we have to force the update of the state because the api returns only a boolean
   * @param {number} pur_id
  **/
  const cancelPurchase = React.useCallback((pur_id) => {
    if(user) {
      const data = user.getJson();
      data['last_purchases'] = data['last_purchases'].filter(pur => String(pur.pur_id) !== String(pur_id));
      dispatch(buyerInformationsAPI.updateOne(
        null,
        { pur_id },
        { forceUpdate: data, url: `${WEEZEVENT_URL}/POSS3/cancel` }
      ));
    }
  }, [dispatch, user]);


  const purchases = handlePurchases(user, articles);

  return (
    <Modal
      open={Boolean(user)}
      centered={false}
      size="tiny"
      >
      <Modal.Header className="modal-header">
        { user ? `${user.getFirstname()} ${user.getLastname()} (${user.getUsername()}) - Solde: ${user.getSolde().toFixed(2)}€` : null }
      </Modal.Header>
      <Modal.Content className="modal-container">
        <div className="modal-buyer-purchases">
          {
            purchases.map(purchase => {
              if(purchase.getArticle()) {
                return (
                  <div className="buyer-row" key={ purchase.getKey() }>
                    <span className="cell qte">{purchase.getQte()}</span>
                    <span className="cell name">{purchase.getArticle().getName()}</span>
                    <span className="cell price">{ purchase.getPrice().toFixed(2) }€</span>
                    <span
                      className="cell trash"
                      onClick = { () => cancelPurchase(purchase.getKey()) }
                      >
                        <Icon name="trash"/>
                    </span>
                  </div>
                )
              }
              return null;
            })
          }
        </div>
        <Button
          color="red"
          fluid
          onClick={ closeModal }
          >
          Fermer
        </Button>
      </Modal.Content>
    </Modal>
  )
}

/**
 * method to get all purchases with the good article name
 * @param {Class} user - the user Object
 * @param {array} articles - the list of articles
 * @returns {array}
**/
const handlePurchases = (user, articles) => {
  if(!user || !articles) {
    return [];
  }

  return user.getLastPurchases().filter(pur => pur.getQte() >= 0 && !pur.getRemoved()).map(purchase => {
    purchase.setArticle(articles.find(article => String(article.getKey()) === String(purchase.getObj())))
    return purchase;
  })
}


export default BuyerInformationsModal;
