import React, { Component } from 'react';
import '../../App.css';
import MenuToServe from './nextmenus'



class MenusToServe extends Component {
  render() {
    return (
      <div>
          <h1> Prochains menus à servir : </h1>
          <MenuToServe></MenuToServe>
      </div>
    );
  }
}

export default MenusToServe;
