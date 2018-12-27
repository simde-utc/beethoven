import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import TemplateArticle from './venteTemplateAchats'

import { getChosenArticle, setTransaction } from "../../actions"

/*Liste des achats qu'un user va payer*/
class Achats extends Component {
  render() {
    const { selectedArticles } = this.props



    var chosenArticles = [];
    if(selectedArticles!==[]){
      selectedArticles.forEach(function(element) {
        const priceA = (element.newPRICE/100)*element.newQTE;
        const prixArt = priceA.toFixed(2);
        const Article = {
          qte:element.newQTE,
          nom:element.newNAME,
          prix:prixArt,
          idart: element.newID
        }
        chosenArticles.push(<TemplateArticle art={Article}/>)
      });
    }
    return (
      chosenArticles
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionId : state.cas.sessionId || null,
    selectedArticles : state.vente.selectedArticles || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    setTransaction : (id,list)=> dispatch(setTransaction(id,list)),
    getChosenArticle : (id,name,price,list)=> dispatch(getChosenArticle(id,name,price,list))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Achats);
