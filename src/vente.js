import React, { Component } from 'react';
import './App.css';
import { SESSIONID, APPKEY } from './config';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Vente extends Component {
  render() {
    const maxSizeTable = {
      maxHeight: 50
    }
    return (
      <div className="Header">
        <div class="row">
           {/*Partie de gauche : Information des futurs achats, validation de la transaction */}
          <div class="col-4">
            {/*Info Achat*/}
            <div class={maxSizeTable}>
              <table class="table table-striped rounded  mt-3 ml-2 w-100 bg-light text-dark text-center ">
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
            </div>
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
                <ListeArticle></ListeArticle>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

{/*Récupération de l'ID de la catégorie selectionnée*/}
function updateArticles(CategId){
  this.setState({CategId})
}

{/*Récupération de l'ID, du nom, et du prix de l'article choisi*/}
function getArticleId(newId,newName,newPrice){
  var actualArticleList = this.state.Article;
  if(typeof actualArticleList !== 'undefined' && actualArticleList.length > 0){
    var found = false;
    for(var i = 0; i < actualArticleList.length; i++) {
        if (actualArticleList[i].artId === newId) {
            found = true;
            actualArticleList[i].artQte++;
            this.setState({
              Article: actualArticleList
            })
            break;
        }
    }
    if(!found){
      var articl = {artId: newId, artName: newName, artPrice: newPrice, artQte: 1}
      actualArticleList.push(articl);
      this.setState({
        Article: actualArticleList
      })
    }
  }else{
    var articl = {artId: newId, artName: newName, artPrice: newPrice, artQte: 1}
    actualArticleList.push(articl);
    this.setState({
      Article: actualArticleList
    })
  }
}

{/*Récupération et affichage des Catégorie pour la vente*/}
class Categorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      idC: []
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(rSelected){
    updateArticles(rSelected)
  }
  componentDidMount() {
    fetch("https://api.nemopay.net/services/POSS3/getSalesLocations?system_id=payutc&app_key="+APPKEY+
    "&sessionid="+SESSIONID+"", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fun_id: 2,
          event_id: 1,
        })
      })
      .then(res1 => res1.json())
      .then(
        (dataLocation) => {
          let id_Categ = dataLocation[0].categories;
          this.setState({
            idC: dataLocation[0].categories
          })
          fetch("https://api.nemopay.net/services/POSS3/getCategories?system_id=payutc&app_key="+APPKEY+
          "&sessionid="+SESSIONID+"", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fun_id: 2,
              })
            })
            .then(res => res.json())
            .then(
              (result) => {
                let categ = [];
                for (let i = 0; i < id_Categ.length; i++) {
                    if (result.find(o => o.id == id_Categ[i])) categ.push(result.find(o => o.id == id_Categ[i]))
                }
                console.log(categ)
                this.setState({
                  isLoaded: true,
                  items: categ
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error: 'Error ah'
                });
              }
            )
        },
        (error) => {
            console.log('FailReessourc')
        });
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const listeCatego = items.map(item => (
        <a class='list-group-item list-group-item-action' data-toggle="list" href={['#list-',item.id].join('')} ref={item.id} id={item.id}
          onClick={() => this.onRadioBtnClick(item.id)} role="tab" >{item.name}</a>
      ))
      return (
        <div class="list-group shadow-lg p-3 mb-5 rounded" id="list-tab" role="tablist">{listeCatego}</div>
    );
    }
  }
}

{/*Affichage des articles dans la colonne de droites par catégorie*/}
class ListeArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CategId: 3,
      error: null,
      isLoaded: false,
      items: []
    };
    this.handleClick = this.handleClick.bind(this);
    updateArticles = updateArticles.bind(this);
  }
  handleClick(idArticle,nameArticle,priceArticle){
    getArticleId(idArticle,nameArticle,priceArticle);
  }
  componentDidMount() {
    fetch("https://api.nemopay.net/services/POSS3/getArticles?system_id=payutc&app_key="+APPKEY+
    "&sessionid="+SESSIONID+"", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fun_id: 2,
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: 'Error ah'
          });
        }
      )
  }
  render() {
    const { CategId, error, isLoaded, items } = this.state;
    var styleButton = {background: 'none'}
    var styleText = {color: 'white'}
    var styleImg = { borderRadius: '10px'}
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        var displayArticle = [];
        items.forEach(function(element) {
          if(element.categorie_id==CategId){
            displayArticle.push(
              <div class="col-sm-2 mb-3" onClick={this.handleClick.bind(this,element.id,element.name,element.price)}>
                <button type="button" class="btn btn-lg btn-block" style={styleButton}>
                  <img class="card-img-top" src={element.image_url} alt="Card image cap" style={styleImg} width="180" height="100"></img>
                  <p style={styleText}>{element.name}</p>
                </button>
              </div>
              )
          }
        },this);
        return (
          <div class="row mt-3 mr-2">
            {displayArticle}
          </div>
      );
    }
  }
}


{/*Template des articles à afficher lors du paiment*/}
class TemplateArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: []
    };
    this.deleteRow = this.deleteRow.bind(this);
  }
  deleteRow(){
    this.setState({
      rows: []
    });
    console.log(this.state);

  }
  templateArt(){
    const art = this.props.art;
    var newRow ={nom: art.nom, prix: art.prix, qte: art.qte}
    this.state.rows.push(newRow)
      if(this.state.rows.length>0){
        let retour = (<tr>
          <th scope="row">{art.qte}</th>
          <td> {art.nom} </td>
          <td> {art.prix} € </td>
            <td><button type="button" class="btn btn-outline-danger btn-xs" onClick={this.deleteRow}>
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
    console.log(this.state.Article[0])
    return (
      this.addArticle()
    );
  }
}



{/*Récupération du ticket*/}
function getTicket(url){
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(url)){
    let match = ticketRegex.exec(url);
    return match[2];
  }
}

{/*Connexion CAS*/}

function getConnect() {
  fetch("https://api.nemopay.net/services/MYACCOUNT/loginCas2?system_id=payutc&app_key=0a93e8e18e6ed78fa50c4d74e949801b", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Nemopay-Version': '2018-07-03',
      },
      body: JSON.stringify({
        ticket: ""+getTicket(window.location.href)+"",
        service: 'http://localhost:3000'
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: 'Error ah'
        });
      }
    )
}




class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://api.nemopay.net/services/MYACCOUNT/loginCas2?system_id=payutc&app_key=0a93e8e18e6ed78fa50c4d74e949801b", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Nemopay-Version': '2018-07-03',
        },
        body: JSON.stringify({
          ticket: ""+getTicket(window.location.href)+"",
          service: 'http://localhost:3000'
        }),
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: 'Error ah'
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    let ticket = getTicket(window.location.href);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <li>  </li>
        </ul>
      );
    }
  }
}


export default Vente;
