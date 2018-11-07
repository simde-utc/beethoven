import React, {Component} from 'react'
import {connect} from 'react-redux'


import '../../App.css';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import {deleteMenus, getMenus} from '../../actions'


class ModalDelete extends Component{
constructor(props)
{
  super(props)
  this.state = {
    visible : this.props.visible
  }
  this.toggle = this.toggle.bind(this)
}

toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

render(){
  const {deleteMenus, getMenus, MenuList} = this.props;

  return(
    <Modal
      isOpen = {this.state.visible}
      toggle = {this.toggle}
      style = {{
        color : 'black'
      }}
      >
      <ModalHeader
        toggle= {()=>{
          this.props.setFalse();

          this.toggle()
        }}
      >
      Supprimer le Menu {this.props.menu}
    </ModalHeader>
    <ModalFooter>
      <Button
        color="danger"
        onClick={
          ()=> {

            deleteMenus(this.props.index, MenuList)
            this.props.setFalse();
            this.toggle()
          }
        }
        >Supprimer</Button>
      <Button
        color="primary"
        onClick = {()=>{
          this.props.setFalse();
          this.toggle()

        }}
        >Annuler</Button>

    </ModalFooter>

    </Modal>
  )
}
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    MenuList : state.menus.MenuList || []
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    deleteMenus : (index, list)=>dispatch(deleteMenus(index, list)),
    getMenus : ()=>dispatch(getMenus())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
