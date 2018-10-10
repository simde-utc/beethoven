import React, { Component } from 'react';
import '../../App.css';
import { APPKEY } from '../../config';
import {connect} from 'react-redux';

import { deleteArticle } from "../../Actions"

{/*Template des articles à afficher lors du paiment*/}
class TemplateArticle extends React.Component {
  templateArt(){
    const art = this.props.art;
    const { selectedArticles } = this.props;
    const { deleteArticle } = this.props
    var newRow = {nom: art.nom, prix: art.prix, qte: art.qte, ida: art.idart}
      if(selectedArticles.length>0){
        let retour = (<tr>
          <th scope="row">{art.qte}</th>
          <td> {art.nom} </td>
          <td> {art.prix} € </td>
            <td><button type="button" class="btn btn-outline-danger btn-xs" onClick={() => deleteArticle(art.idart,selectedArticles)}>
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>)
        return (retour);
      }else{
        return (<div></div>);
      }
  }
  render() {
    return (
      this.templateArt()
    );
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    selectedArticles : state.vente.selectedArticles || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    deleteArticle : (id,list)=> dispatch(deleteArticle(id,list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (TemplateArticle);
