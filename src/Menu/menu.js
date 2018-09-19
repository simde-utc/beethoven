import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';


// Mise à jour de index dans state pour connaitre le bouton selectionné
function updateNavIndex(NavIndex){
  this.setState({NavIndex})
}

function updateMenuList(MenuList){
  this.setState({MenuList})
}



//Classe de navigation entre les différents menus disponibles à la vente
//le bouton cliqué  changera la valeur de index dans les state
// TODO: ICI POUR GERER LES ROUTES ETC ETC ?

// TODO: liaison avec une route pour avoir les menus disponibles
// TODO: n'afficher que la liste des ventes du menu cliqué

class MenuNav extends Component {

  constructor(props){
    super(props);
    this.state = {
      index: null,
       //changement de couleur pour un menu selectionné
      navStyleSelected : {
        color : 'white',
        background :  '#B22132'
      },

      //changement de couleur pour un menu selectionné
      navStyle : {
        color : 'white',
        background :  'none'
      }
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    //gestion du clique bouton
    // La liaison est effectuée avec la classe Menu
    // TODO: ICI POUR LES ROUTES
    onRadioBtnClick(rSelected){
      this.setState({index : rSelected});
      updateNavIndex(rSelected);

    fetch("http://37.139.25.111/getorders/"+rSelected, {
      method : 'GET',
      mode:'cors',
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        
    }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('okok')
            updateMenuList(result.orders)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.

        (error) => {
            console.log(error)
        }
      )


    }

    //ajout d'un nouveau bouton pour chaque menu présent
     addButton = (bName, bId)=>{
      return(
           <NavItem>
             <NavLink
               href="#"
               focus = {this.state.index === bId}
               style = { this.state.index === bId ? this.state.navStyleSelected : this.state.navStyle}
               active = {this.state.index === bId}
               onClick = {() => this.onRadioBtnClick(bId)}
               >
               {bName}

             </NavLink>
           </NavItem>
         );
    }


// TODO: boucle for pour gérer l'ensemble des menus présents en vente
  render() {
    return (
      <div className="MenuNav">

        <Nav vertical>

          <NavItem>{this.addButton("Menu 1", 13453)}</NavItem>

          <NavItem>{this.addButton("Menu 2", 3564)}</NavItem>
         {/*}<p>Selected : {this.state.index}</p>*/ }
        </Nav>


      </div>
    );
  }
}



//CLASSE Menu qui affiche l'ensemble des menus commandés sur le type de menu selectionné
// TODO: Mettre la liste de personnes dans les props ou dans les states?
class Menu extends Component {

  constructor(props){
    super(props)
    this.state={
      NavIndex:null,
      MenuList: []
    }
    //reccupération des informations de la nav
    updateNavIndex = updateNavIndex.bind(this)
    updateMenuList = updateMenuList.bind(this)
  }

//changement de l'état du bouton
// TODO: envoyer info au back pour changer la valeur de served
  onButtonClick(index){
    console.log(this.state.MenuList[index].first_name)
    this.state.MenuList[index].served = !this.state.MenuList[index].served
    this.forceUpdate()
  }


//Liste des Menus commandés identifiés par
// Nom
// prenom
// Qte
// served?

  printAllMenu(){
    let MenuList = []


    let printMenu = (menu, index)=>{
      return(
          <tr>
            <td>{menu.last_name}</td>
            <td>{menu.first_name}</td>
            <td>{menu.quantity}</td>
            <td><Button
              color={this.state.MenuList[index].served === false ? 'success' : 'danger'}
              onClick = {() =>this.onButtonClick(index)}
              >{this.state.MenuList[index].served===false ? 'Valider' : 'Annuler'}</Button></td>
          </tr>
        )

      }

    this.state.MenuList.forEach(function(menu, index){
      MenuList.push(printMenu(menu,index))
    })

    return MenuList;
  }

  returnTab(){
    return(
      <Table>
        <thead>
          <tr>
            <th> Nom </th>
            <th> Prénom </th>
            <th> Qte </th>
            <th> served </th>
          </tr>
        </thead>
        <tbody>
    {this.printAllMenu()}
        </tbody>
      </Table>

    )
  }


  render() {
    return (
      <div className="Menu">
        <h2>
          {this.state.NavIndex ? 'Informations du Menu n°'+this.state.NavIndex : ''}
        </h2>
        {this.state.NavIndex ? this.returnTab() : <h3> Veuillez choisir un Menu de la liste</h3>}
      </div>
    );
  }
}



class MenuBody extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return (
      <div className="MenuBody">
        <Container fluid>
          <Row>
          <Col md="3"> <MenuNav></MenuNav> </Col>
          <Col md="9"> <Menu ></Menu> </Col>


          </Row>

        </Container>
      </div>
    );
  }
}








export default MenuBody;
