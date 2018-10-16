import React, { Component } from 'react';
import '../App.css';




export const onTrashClick = (buttonId, success, failure)=>{
  fetch(
    "http://37.139.25.111/setMenuClosed/" + buttonId,
    {
      method:'POST',
      mode:'cors',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      cache:'no-store',
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
    "http://37.139.25.111/menus", {
      method : 'GET',
      mode : 'cors',
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      cache:'no-store',
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
  fetch("http://37.139.25.111/getorders/"+idMenu, {
    method: 'GET',
    mode: 'cors',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
    cache:'no-store',
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
