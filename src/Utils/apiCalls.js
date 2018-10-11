import React, { Component } from 'react';
import '../App.css';




export const onTrashClick = (buttonId, success, failure)=>{
  fetch(
    "http://37.139.25.111/setMenuClosed/" + buttonId +"?random="+Math.random(),
    {
      method:'POST',
      mode:'cors',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then().then(
      (result)=>{
        success(result)
      },
      (error)=>{
        failure(error)
      }
    ).catch((err)=>{failure(err)})
}

export const fetchMenus = (success, failure)=>{
  fetch(
    "http://37.139.25.111/menus/?random="+Math.random(), {
      method : 'GET',
      mode : 'cors',
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }).then(res=>res.json()).then(
      (result)=>{
        success(result)
      },
      (error)=>{
        failure(error)
      }
    ).catch((err)=>{failure(err)})
}


export const fetchServed = (id, success,failure)=>{
  fetch("http://37.139.25.111/setMenuServed/"+id, {
    method : 'POST',
    mode:'cors',
    headers:{
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
  }
  })
    .then((result)=>{
      if(result.ok){
        //fetchMenuList(this.state.NavIndex)
        success(result)
      } else{
        failure(result)
      }
    }).catch((err)=>{failure(err)})
}


export const fetchMenuList = (idMenu, success, failure)=>{
  fetch("http://37.139.25.111/getorders/"+idMenu+"?random="+Math.random(), {
    method: 'GET',
    mode: 'cors',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
  .then(res => res.json())
  .then(
    (result)=>{
      success(result)
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})

}

export const loginBadge = (userUid, userPin) => {
  fetch("https://api.nemopay.net/Services/POS3/loginBadge2",{
    method:'POST',
  })
}
