import React, { Component } from 'react';
import '../../App.css';
import { WEEZEVENT_APP_KEY } from '../../Utils/config';
import {connect} from 'react-redux';

import { getListCateg, updateCategorie } from "../../actions"


{/*Liste des catégories*/}
class Categorie extends Component {
  componentWillMount() {
    const {listCateg, sessionId, loaded, event_id} = this.props
    const { getListCateg, updateCategorie } = this.props;
    getListCateg(sessionId,event_id);
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
    sessionId : state.cas.sessionId || null,
    listCateg : state.vente.loaded || false,
    listCateg : state.vente.listCateg || [],
    event_id : state.vente.event_id || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    updateCategorie : (index)=> dispatch(updateCategorie(index)),
    getListCateg : (sessionId,index)=> dispatch(getListCateg(sessionId,index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(Categorie);
