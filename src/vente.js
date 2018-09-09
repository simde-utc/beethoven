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
            <Achats></Achats>
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
          <Categorie></Categorie>
        </div>

        {/*Liste des articles selon le type sélectionné*/}
        <div class="col-6">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-Soft" role="tabpanel" aria-labelledby="list-soft-list"><button type="button" class="btn btn-primary">TEST AJOUT</button></div>
              <div class="tab-pane fade" id="list-Pampryls" role="tabpanel" aria-labelledby="list-pampryls-list">...</div>
              <div class="tab-pane fade" id="list-Glacé" role="tabpanel" aria-labelledby="list-glace-list">...</div>
              <div class="tab-pane fade" id="list-Snack-Sucré" role="tabpanel" aria-labelledby="list-scnacksucre-list">...</div>
              <div class="tab-pane fade" id="list-Snack-Salé" role="tabpanel" aria-labelledby="list-scnacksale-list">...</div>
              <div class="tab-pane fade" id="list-Petit-Dej" role="tabpanel" aria-labelledby="list-petitdej-list">...</div>
              <div class="tab-pane fade" id="list-Fruits-Jus-Frais" role="tabpanel" aria-labelledby="list-fruit-list">ABLAHH</div>
              <div class="tab-pane fade" id="list-Repas" role="tabpanel" aria-labelledby="list-repas-list">...</div>
            </div>
        </div>
      </div>

      </div>
    );
  }
}

{/*class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      qte: null,
      nom: '',
      prix: null,
      categorie_id: null,
      alcool: false,
      image: null
    };
  }
  render() {
    return (
      <th scope="row">1</th>
      <td>PAMPRYL OAC</td>
      <td>0.65 €</td>
    );
  }
}*/}


{/*Front pour l'affichage de l liste des articles à payer*/}
function Articles(props){
  return (
    <tr>
    <th scope="row">{props.qte}</th>
    <td> {props.nom} </td>
    <td> {props.prix} € </td>
      <td><button type="button" class="btn btn-outline-danger btn-xs">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
      </td>
    </tr>
  );
}
{/*Classe qui reference la liste des achats d'un user*/}
class Achats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achat: []
    };
  }
  addArticle() {
    return (
      <Articles qte='3' nom='PAMPRYL OAC' prix= '0.65'/>
    );
  }
  render() {
    return (
      this.addArticle()
    );
  }

  {/*Il faut une fonction qui permet de supprimer une ligne de la liste des articles*/}


}


{/*Classe des différents types d'articles*/}
class Categorie extends Component {
  render() {
    const categ = ['Soft','Pampryls','Glacé','Snack-Sucré','Snack-Salé','Petit-Dej','Fruits-Jus-Frais','Repas']
    const listeCateg = categ.map((categ)=>
    <a class='list-group-item list-group-item-action' data-toggle="list" href={['#list-',categ].join('')} role="tab" >{categ}</a>  );
    return (
      <div class="list-group shadow-lg p-3 mb-5 rounded" id="list-tab" role="tablist">{listeCateg}</div>
    );
  }
}

export default Vente;
