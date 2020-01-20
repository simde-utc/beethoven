import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { Article } from "../../models";

import { useDispatch, useSelector } from "react-redux";
import {
  transaction as transactionAPI,
} from "../../api/state";
import { getData, insertData } from "../../api/internal";
import { BuyerInformationsModal } from "../../components/modals";

const PaymentPanel = () => {

   const { selectedArticles } = useSelector(state => ({
     selectedArticles: getData(state, 'selectedArticles') || {}
   }));

  const dispatch = useDispatch();

  const removeItem = React.useCallback((id) => {
    const newData = Object.keys(selectedArticles).filter(
      key => String(key) !== String(id)).reduce(
      (list, key) => { list[key] = selectedArticles[key]; return list;}, {});
    return dispatch(insertData('selectedArticles', newData));
  }, [dispatch, selectedArticles]);

  const deleteAllSelection = React.useCallback(() => dispatch(insertData('selectedArticles', {})), [dispatch]);

  const totalPrice = Object.entries(selectedArticles).reduce((total, [,current]) => total + current.qte*current.article.getPrice(), 0);


  return (
    <React.Fragment>
      <div className="payment-container">
        <div className="title">Votre Panier</div>

      <div className="payment-articles">
        <div className="payment-header">
          <span className="cell-header"> Qte </span>
          <span className="cell-header large"> Article </span>
          <span className="cell-header"> Prix </span>
          <span className="cell-header"></span>
        </div>
          {
            Object.entries(selectedArticles).map(([,{article, qte}] )=> (
              <Item
                key={article.getKey()}
                article={article}
                qte={qte}
                onClick={ removeItem }
                />
            ))
          }
        </div>
        <div className="payment-footer">
          <Button
            fluid
            disabled = {!Object.keys(selectedArticles).length}
            onClick={ deleteAllSelection }
            className="button-cancel"
            >
            Annuler tout
          </Button>
          <PaymentResponse totalPrice={totalPrice} deleteAllSelection={deleteAllSelection}/>
        </div>
      </div>
      <BuyerInformationsModal/>
    </React.Fragment>
  )
}

export default PaymentPanel;


const Item = ({ article, qte, onClick }) => {
  const price = (article.getPrice() * qte).toFixed(2);
  return (
    <div className="selected-article-item">
      <span className="item-qte cell">{ qte }</span>
      <span className="item-name cell">{ article.getName() }</span>
      <span className="item-price cell">{ price }€</span>
      <span className="item-trash cell" onClick={() => onClick(article.getKey())}><Icon name="trash"/></span>
    </div>
  )
}

Item.propTypes = {
  article: PropTypes.instanceOf(Article).isRequired,
  qte: PropTypes.number.isRequired
}

const PaymentResponse = ({ totalPrice, deleteAllSelection }) => {
  const {
    error,
    success,
    creating,
    reader
  } = useSelector(state => ({
    error: transactionAPI.getErrorFromState(state),
    success: transactionAPI.getCurrentFromState(state),
    creating: transactionAPI.getCreatingFromState(state),
    reader: getData(state, 'reader')
  }));

  const dispatch = useDispatch();
  const resetCurrent = React.useCallback(() =>{
    dispatch(transactionAPI.resetCurrent())
  }, [dispatch])

  React.useEffect(() => {
    let timer;
    if(error || success) {
      deleteAllSelection();
      timer = setTimeout(resetCurrent, 2000);
    }

    return () => clearTimeout(timer);
  }, [error, success, resetCurrent, deleteAllSelection]);

  if(!reader) {
    return(
      <div className="payment-information">
        Aucun lecteur de carte trouvé
      </div>
    );
  }

  if(creating) {
    return (
      <div className="payment-information">
        Transaction en cours...
      </div>
    )
  }

  if(error) {
    return (
      <div className="payment-information error">
        { error.getError() }
      </div>
    )
  }

  if(success) {
    return (
      <div className="payment-information success">
        <p>{`${success.getFirstname()} ${success.getLastname()} (${success.getUsername()})`}</p>
        <p>{ `Transaction effectuée: Il te reste ${success.getSolde().toFixed(2)}€` }</p>
      </div>
    )
  }

  return (
    <div className="payment-information">
      {`Prêt à payer: ${totalPrice.toFixed(2)}€`}
    </div>
  )
}

// <WebSocket
//   url={WEBSOCKET_URL}
//   onMessage={(data) => handleReader(data)}
//   onOpen={() => setReader(true)}
//   onClose={() => setReader(false)}
//   />
