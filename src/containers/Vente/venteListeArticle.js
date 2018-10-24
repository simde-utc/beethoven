import React, { Component } from 'react';
import '../../App.css';
import { WEEZEVENT_APP_KEY } from '../../Utils/config';
import {connect} from 'react-redux';

import { updateCategorie, getChosenArticle, getListArticles } from "../../actions"

{/*Affichage des articles dans la colonne de droites par catégorie*/}
class ListeArticle extends Component {
  componentWillMount() {
    const { sessionId, listArticles } = this.props;
    const { getListArticles } = this.props;
    console.log('LE SESSION ID VAUT' + sessionId)
    getListArticles(sessionId);
  }
  render() {
    const { id_Categ, listArticles, selectedArticles } = this.props
    const { getChosenArticle } = this.props
    var styleButton = {background: 'none',
                       minWidth: '120px',
                       minHeight: '120px'}
    var styleText = {color: 'black',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }
    var styleDiv = {
      background: 'white',
      minWidth: '100px',
      minHeight: '100px',
      borderRadius: '10px',
      color: 'black',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        overflow: 'hidden'

    }
    var styleImg = { borderRadius: '10px'}
    var displayArticle = [];
    listArticles.forEach(function(element) {
      if(element.categorie_id==id_Categ){

        if(element.image_url){
          displayArticle.push(
            <div class="col-sm-3 mb-3" onClick={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
              <button type="button" class="btn btn-lg btn-block" style={styleButton}>
                <img class="card-img-top" src={element.image_url} alt="Card image cap" style={styleImg} width="100" height="100"></img>
              </button>
            </div>
            )
          }
          else{
            displayArticle.push(
              <div class="col-sm-3 mb-3" onClick={() => getChosenArticle(element.id,element.name,element.price, selectedArticles)}>
                <button type="button" class="btn btn-lg btn-block" style={styleButton}>
                    <div class="card-img-top" style={styleDiv}>{element.name}</div>
                </button>
              </div>
              )
          }
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
    sessionId : state.cas.sessionId || null,
    selectedArticles : state.vente.selectedArticles || [],
    id_Categ : state.vente.id_Categ || 3,
    listArticles : state.vente.listArticles || [],
    loadedArt : state.vente.loadedArt || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getChosenArticle : (id,name,price,list)=> dispatch(getChosenArticle(id,name,price,list)),
    getListArticles : (sessionId)=> dispatch(getListArticles(sessionId))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
(ListeArticle);
