import React, { Component } from 'react';
import '../../App.css';
import { APPKEY } from '../../config';
import {connect} from 'react-redux';

import { getListCateg } from "../../Actions"


function updateArticles(CategId){
  this.setState({CategId})
}

{/*Liste des catégories*/}
class Categorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'TRYYY'
    }
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(rSelected){
    updateArticles(rSelected)
  }
  componentDidMount() {
    const { getListCateg } = this.props;
    const { listCateg } = this.props;
    getListCateg(this.props.sessionid);
  }
  render() {
    const { listCateg } = this.props;
    const listeCatego = listCateg.map(item => (
      <a class='list-group-item list-group-item-action' data-toggle="list" href={['#list-',item.id].join('')} ref={item.id} id={item.id}
        onClick={() => this.onRadioBtnClick(item.id)} role="tab" >{item.name}</a>
    ))
    return (
      <div class="list-group shadow-lg p-3 mb-5 rounded" id="list-tab" role="tablist">{listeCatego}</div>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    listCateg : state.vente.listCateg || null
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getListCateg : (sessionid)=> dispatch(getListCateg(sessionid))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Categorie);
