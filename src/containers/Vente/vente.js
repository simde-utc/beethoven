import React, { Component } from 'react';
import '../../App.css';
import { WEEZEVENT_APP_KEY } from '../../Utils/config';
import {connect} from 'react-redux';

import Achats from "./venteAchats.js"
import ListeArticle from "./venteListeArticle.js"
import Categorie from "./venteCategories.js"

import { getListCateg, deleteAllArticles } from "../../actions"


class Vente extends Component {
  render() {
    const maxSizeTable = {
      maxHeight: 50
    }
    const { deleteAllArticles } = this.props;
    const { selectedArticles } = this.props;
    const annuler =             (<div>
                                    <button class="btn btn-primary ml-2 mb-2 btn-block" onClick={() => deleteAllArticles(selectedArticles)}>
                                      Annuler tout
                                    </button>
                                  </div>)
    return (
      <div className="Header">
        <div class="row">
           {/*Partie de gauche : Information des futurs achats, validation de la transaction */}
          <div class="col-4">
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
            <button class="btn btn-primary ml-2 mb-3 btn-block" data-toggle="modal" data-target="#infoUser">Info Carte</button>
            <div class="modal fade" id="infoUser" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-info" id="exampleModalLabel">Information de la carte</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p class="text-info">Les infos du user ici</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  </div>
                </div>
              </div>
            </div>
            {/*Etat de la transaction*/}
            <div class="alert alert-dark ml-2 w-100" role="alert">
              Prêt !
            </div>
          </div>
          {/*Différents type d'articles*/}
          <div class="col">
              <Categorie sessionId={this.props.sessionId}></Categorie>
          </div>
          {/*Liste des articles selon le type sélectionné*/}
          <div class="col-6">
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
    listCateg : state.vente.listCateg || [],
    selectedArticles : state.vente.selectedArticles || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getListCateg : (sessionId)=> dispatch(getListCateg(sessionId)),
    deleteAllArticles : (list)=> dispatch(deleteAllArticles(list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(Vente);
