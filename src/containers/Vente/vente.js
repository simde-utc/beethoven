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
    const { selectedArticles, state_transaction, info_client, sessionId, info_transaction, listArticles} = this.props;
    const annuler =             (<div>
                                    <button class="btn btn-primary ml-2 mb-2 btn-block" onClick={() => deleteAllArticles(selectedArticles)}>
                                      Annuler tout
                                    </button>
                                  </div>)

    let stateTrans;
    if(state_transaction=='loading'){
      stateTrans = (<div class="alert alert-dark ml-2 w-100" role="alert">
                    Transaction en cours.... !
                  </div>);
    }else if(state_transaction=='success'){
      stateTrans = (<div class="alert ml-2 w-100 bg-success" role="alert">
                    Transaction effectuée, ton nouveau solde Payutc est de {info_transaction.solde/100} € !
                  </div>);
      setTimeout(function(){setTransactionState('listen')}, 3000)
    }else if(state_transaction=='listen'){
       stateTrans = (<div class="alert alert-dark ml-2 w-100" role="alert">
                        Prêt !
                      </div>)
            }
      else if(state_transaction=='failed'){
        stateTrans = (<div class="alert ml-2 w-100 bg-danger" role="alert">
                       {info_transaction.error.message}
                    </div>);
        setTimeout(function(){setTransactionState('listen')}, 3000)
      }
    let info;
    if(info_client){
      let list_last_purchases = [];
      list_last_purchases.push(
        <tr>
          <td> Quantité </td>
          <td scope="row"> Nom </td>
          <td> Prix </td>
            <td>
            </td>
        </tr>
      )
      info_client.last_purchases.forEach(function(el) {
        let name = listArticles.filter((item) =>  item.id == el.obj_id);
        list_last_purchases.push(
          <tr>
            <td> {el.pur_qte} </td>
            <th scope="row">{name[0].name}</th>
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
        <div class="row mr-4 ml-0">
           {/*Partie de gauche : Information des futurs achats, validation de la transaction */}
           <div class="col-6 px-0">
            <div class="row">
              <div class="col-7 pr-0">
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
          <div class="col-6 px-0 fill tableau-articles no-gutters" >
                <ListeArticle sessionId={this.props.sessionId}></ListeArticle>
          </div>
        </div>
      </div>
    );
  }
}


//1366 * 768
let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionId : state.cas.sessionId || null,
    listCateg : state.vente.listCateg || [],
    listArticles : state.vente.listArticles || [],
    selectedArticles : state.vente.selectedArticles || [],
    state_transaction : state.achats.state_transaction || 'listen',
    info_client : state.achats.info_client || null,
    info_transaction : state.achats.info_transaction || null
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
