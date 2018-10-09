import React, { Component } from 'react';
import '../App.css';
import { APPKEY } from '../config';
import {connect} from 'react-redux'



{/*Liste des achats qu'un user va payer*/}
class Achats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Article: [],
    };
    getArticleId = getArticleId.bind(this);
  }
  addArticle() {
    var listeArticle = [];
    this.state.Article.forEach(function(element) {
      const priceA = (element.artPrice/100)*element.artQte;
      const prixArt = priceA.toFixed(2);
      const Article = {
        qte:element.artQte,
        nom:element.artName,
        prix:prixArt
      }
      listeArticle.push(<TemplateArticle art={Article}/>)
    });
    return (
      listeArticle
    );
  }
  render() {
    return (
      this.addArticle()
    );
  }
}
