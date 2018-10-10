import React, { Component } from 'react';
import '../../App.css';
import { APPKEY } from '../../config';
import {connect} from 'react-redux';

import { getListCateg, updateCategorie } from "../../Actions"


{/*Liste des catégories*/}
class Categorie extends Component {
  componentWillMount() {
    const {listCateg, sessionid, loaded} = this.props
    const { getListCateg } = this.props;
    let xx = sessionid;
    getListCateg(sessionid);
  }
  render() {
    const { listCateg } = this.props;
    const { updateCategorie } = this.props;
    const listeCatego = listCateg.map(item => (
      <a class='list-group-item list-group-item-action' data-toggle="list" href={['#list-',item.id].join('')} ref={item.id} id={item.id}
        onClick={() => updateCategorie(item.id)} role="tab" >{item.name}</a>
    ))
    return (
      <div class="list-group shadow-lg p-3 mb-5 rounded" id="list-tab" role="tablist">{listeCatego}</div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    sessionid : state.cas.sessionid || null,
    listCateg : state.vente.loaded || false,
    listCateg : state.vente.listCateg || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    updateCategorie : (index)=> dispatch(updateCategorie(index)),
    getListCateg : (sessionid)=> dispatch(getListCateg(sessionid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Categorie);
