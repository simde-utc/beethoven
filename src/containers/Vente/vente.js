import React, { Component } from 'react';
import '../../App.css';
import { WEEZEVENT_APP_KEY } from '../../Utils/config';
import {connect} from 'react-redux';

import Achats from "./venteAchats.js"
import ListeArticle from "./venteListeArticle.js"
import Categorie from "./venteCategories.js"

import { getListCateg, deleteAllArticles, setTransactionState, setClientState, cancelTransaction } from "../../actions"


class Vente extends Component {
  render() {
    const maxSizeTable = {
      maxHeight: 50
    }
    const { deleteAllArticles, setTransactionState, setClientState, cancelTransaction } = this.props;
    const { selectedArticles, state_transaction, info_client, sessionId } = this.props;
    const annuler =             (<div>
                                    <button class="btn btn-primary ml-2 mb-2 btn-block" onClick={() => deleteAllArticles(selectedArticles)}>
                                      Annuler tout
                                    </button>
                                  </div>)

    let stateTrans;
    if(state_transaction=='success'){
      stateTrans = (<div class="alert alert-success ml-2 w-100" role="alert">
                    Transaction effectuée !
                  </div>);
      setTimeout(function(){setTransactionState('listen')}, 3000)
    }else if(state_transaction=='listen'){
       stateTrans = (<div class="alert alert-dark ml-2 w-100" role="alert">
                        Prêt !
                      </div>)
            }
    let info;
    if(info_client){
      let list_last_purchases = [];
      info_client.last_purchases.forEach(function(el) {
        list_last_purchases.push(
          <tr>
            <th scope="row">{el.obj_id}</th>
            <td> {el.pur_qte} </td>
            <td> {el.pur_price/100} € </td>
              <td><button type="button" class="btn btn-outline-danger btn-xs" onClick={() =>
                      cancelTransaction(sessionId,el.pur_id)
                    }>
                    Annuler
                  </button>
              </td>
          </tr>
        )
      });
      info = (<div class="modal show" id="infouser" style={{display: 'inline-block'}} role="dialog">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title text-info" >{info_client.firstname}   {info_client.lastname} - {info_client.username}     |      Solde : {info_client.solde/100}€</h5>
                            </div>
                            <div class="modal-body text-info">
                              <table class="table table-striped rounded  mt-3 ml-2 w-100 bg-light text-dark text-center ">
                                {list_last_purchases}
                              </table>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setClientState()}>Fermer</button>
                            </div>
                          </div>
                        </div>
                      </div>)
    }else{info = (<div></div>)}
    return (
      <div className="Header">
        <div class="row">
           {/*Partie de gauche : Information des futurs achats, validation de la transaction */}
           <div class="col-7">
            <div class="row">
              <div class="col-7">
                {/*Info Achat*/}
                <div class={maxSizeTable}>
                  <table class="table table-striped rounded  mt-3 ml-2 w-100 bg-light text-dark text-center ">
                    <thead>
                      <tr>
                        <th scope="col">Qte</th>
                        <th scope="col">Nom Prod</th>
                        <th scope="col">Prix</th>
                        <th></th>
                      </tr>
                    </thead>
                    <Achats sessionId={this.props.sessionId}></Achats>
                  </table>
                </div>
                {/*Annulation des achats en cours*/}
                  {annuler}
                {/*Information sur la carte -> Annuler un paiment / info sur la carte*/}
                  {info}
                {/*Etat de la transaction*/}
                  {stateTrans}
              </div>
              {/*Différents type d'articles*/}
              <div class="col-5">
                  <Categorie sessionId={this.props.sessionId}></Categorie>
              </div>
            </div>
          </div>
          {/*Liste des articles selon le type sélectionné*/}

          <div class="col-5">
              <div class="tab-content" id="nav-tabContent">
                <ListeArticle sessionId={this.props.sessionId}></ListeArticle>
              </div>
          </div>

        </div>
      </div>
    );
  }
}



let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionId : state.cas.sessionId || null,
    listCateg : state.vente.listCateg || [],
    selectedArticles : state.vente.selectedArticles || [],
    state_transaction : state.achats.state_transaction || 'listen',
    info_client : state.achats.info_client || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getListCateg : (sessionId)=> dispatch(getListCateg(sessionId)),
    deleteAllArticles : (list)=> dispatch(deleteAllArticles(list)),
    setTransactionState : (state)=> dispatch(setTransactionState(state)),
    setClientState : ()=> dispatch(setClientState()),
    cancelTransaction : (session,id)=> dispatch(cancelTransaction(session,id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(Vente);
