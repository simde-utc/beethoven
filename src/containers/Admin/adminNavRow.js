import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'

import {MdTv} from 'react-icons/md'
import {NavItem, NavLink} from 'reactstrap'

import {updateAdminNav, setTvLink} from '../../actions'
class AdminNavRow extends Component {
  render() {
    const {AdminNav} = this.props
    const {updateAdminNav, setTvLink} = this.props
    return(
      <div
        className ="AdminNavRow"

        style = {
          {
            color : 'black'
          }
        }
        >
        <NavItem
          href='#'
          focus = {this.props.index === AdminNav}
          style = {
            this.props.index === AdminNav ?
            {
              backgroundColor:'#B22132',
              padding : '5px',
              textAlign : 'left',
              color:'#e9e9e9',
            }:
            {
              backgroundColor:'',
              padding : '5px',
              textAlign : 'left',
              color: 'black',

            }
          }

          active = {this.props.index   === AdminNav}
          onClick = {()=>{
            console.log(this.props.index)
            updateAdminNav(this.props.index)
//            setTvLink(1, "http://assos.utc.fr/", true)
//            setTvLink(2, "http://beethoven.picasso-utc.fr/NextMenus", true)



          }}

          >
          <table>
            <tr>
              <td>{this.props.logo}</td>
              {window.innerWidth>=980?
                <td>{this.props.nom}</td>:
                  ""
              }
            </tr>
          </table>

        </NavItem>

      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //MyVar : state.location.MyVar || defaultValue
    AdminNav : state.admin.AdminNav || null
  };
}


let mapDispatchToProps = (dispatch)=>{
  return{
    //myfunction : ()=> dispatch(myfunction())
    updateAdminNav : (id)=>dispatch(updateAdminNav(id)),
    setTvLink : (idTv, url, messages)=>dispatch(setTvLink(idTv,url,messages))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(AdminNavRow);
