import React, { Component } from 'react';
import '../../App.css';
import { APPKEY } from '../../config';
import {connect} from 'react-redux';

import { updateCategorie, getChosenArticle, getListArticles } from "../../Actions"


{/*Affichage des articles dans la colonne de droites par catégorie*/}
class ListeArticle extends Component {
  componentWillMount() {
    const { sessionid, listArticles } = this.props;
    const { getListArticles } = this.props;
    getListArticles(sessionid);
  }
  render() {
    const { id_Categ, listArticles, selectedArticles } = this.props
    const { getChosenArticle } = this.props
    var styleButton = {background: 'none'}
    var styleText = {color: 'white'}
    var styleImg = { borderRadius: '10px'}
    var displayArticle = [];
    listArticles.forEach(function(element) {
      if(element.categorie_id==id_Categ){
        displayArticle.push(
          <div class="col-sm-2 mb-3" onClick={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
            <button type="button" class="btn btn-lg btn-block" style={styleButton}>
              <img class="card-img-top" src={element.image_url} alt="Card image cap" style={styleImg} width="180" height="100"></img>
              <p style={styleText}>{element.name}</p>
            </button>
          </div>
          )
      }
    });
    return (
        <div class="row mt-3 mr-2">
          {displayArticle}
        </div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionid : state.cas.sessionid || null,
    selectedArticles : state.vente.selectedArticles || [],
    id_Categ : state.vente.id_Categ || 3,
    listArticles : state.vente.listArticles || [],
    loadedArt : state.vente.loadedArt || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getChosenArticle : (id,name,price,list)=> dispatch(getChosenArticle(id,name,price,list)),
    getListArticles : (sessionid)=> dispatch(getListArticles(sessionid))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ListeArticle);
