import React, { Component } from 'react';
import './App.css';

class Vente extends Component {
  render() {
    return (
      <div className="Header">
      <div class="row">

         {/*Partie de gauche : Information des futurs achats, validation de la transaction */}
        <div class="col-4">

          {/*Info Achat*/}
          <table class="table table-striped rounded  mt-3 ml-2 w-100 bg-light text-dark text-center">
            <thead>
              <tr>
                <th scope="col">Qte</th>
                <th scope="col">Nom Prod</th>
                <th scope="col">Prix</th>
                <th></th>
              </tr>
            </thead>
            <tr>
              <th scope="row">1</th>
              <td>PAMPRYL OAC</td>
              <td>0.65 €</td>
              <td><button type="button" class="btn btn-outline-danger btn-xs">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
              </td>
            </tr>
            </table>

          {/*Annulation des achats en cours*/}
          <div>
          <button class="btn btn-primary ml-2 mb-2 btn-block" >Annuler tout</button>
          </div>

          {/*Information sur la carte -> Annuler un paiment / info sur la carte*/}
          <button class="btn btn-primary ml-2 mb-3 btn-block" data-toggle="modal" data-target="#infoUser">Info Carte</button>
          <div class="modal fade" id="infoUser" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
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
          <div class="list-group shadow-lg p-3 mb-5 rounded" id="list-tab" role="tablist">
              <a class="list-group-item list-group-item-action active" id="list-soft-list" data-toggle="list" href="#list-soft" role="tab" aria-controls="soft">Soft</a>
              <a class="list-group-item list-group-item-action" id="list-pampryls-list" data-toggle="list" href="#list-pampryls" role="tab" aria-controls="pampryls">Pampryls</a>
              <a class="list-group-item list-group-item-action" id="list-glace-list" data-toggle="list" href="#list-glace" role="tab" aria-controls="glace">Glacé</a>
              <a class="list-group-item list-group-item-action" id="list-scnacksucre-list" data-toggle="list" href="#list-scnacksucre" role="tab" aria-controls="scnacksucre">Snack Sucré</a>
              <a class="list-group-item list-group-item-action" id="list-scnacksale-list" data-toggle="list" href="#list-scnacksale" role="tab" aria-controls="scnacksale">Snack Salé</a>
              <a class="list-group-item list-group-item-action" id="list-petitdej-list" data-toggle="list" href="#list-petitdej" role="tab" aria-controls="petitdej">Petit Dej</a>
              <a class="list-group-item list-group-item-action" id="list-fruit-list" data-toggle="list" href="#list-fruit" role="tab" aria-controls="fruit">Fruits & Jus Frais</a>
              <a class="list-group-item list-group-item-action" id="list-repas-list" data-toggle="list" href="#list-repas" role="tab" aria-controls="repas">Repas</a>
          </div>
        </div>

        {/*Liste des articles selon le type sélectionné*/}
        <div class="col-6">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-soft" role="tabpanel" aria-labelledby="list-soft-list">.Les.Softs.</div>
              <div class="tab-pane fade" id="list-pampryls" role="tabpanel" aria-labelledby="list-pampryls-list">...</div>
              <div class="tab-pane fade" id="list-glace" role="tabpanel" aria-labelledby="list-glace-list">...</div>
              <div class="tab-pane fade" id="list-scnacksucre" role="tabpanel" aria-labelledby="list-scnacksucre-list">...</div>
              <div class="tab-pane fade" id="list-scnacksale" role="tabpanel" aria-labelledby="list-scnacksale-list">...</div>
              <div class="tab-pane fade" id="list-petitdej" role="tabpanel" aria-labelledby="list-petitdej-list">...</div>
              <div class="tab-pane fade" id="list-fruit" role="tabpanel" aria-labelledby="list-fruit-list">...</div>
              <div class="tab-pane fade" id="list-repas" role="tabpanel" aria-labelledby="list-repas-list">...</div>
            </div>
        </div>
      </div>

      </div>
    );
  }
}

export default Vente;
