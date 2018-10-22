import React, { Component } from 'react';
import '../../App.css';
import { WEEZEVENT_APP_KEY } from '../../Utils/config';
import {connect} from 'react-redux';

import {Button} from 'reactstrap'
import {FaTrash} from 'react-icons/fa';

import { deleteArticle } from "../../actions"

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
                  <FaTrash></FaTrash>
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
