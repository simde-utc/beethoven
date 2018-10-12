import React, { Component } from 'react';
import '../App.css';
import {WEEZEVENT_APP_KEY} from './config'



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

export const loginBadge2 = (userUid, userPin, success, error) => {
  console.log(WEEZEVENT_APP_KEY, userUid, userPin)
  fetch("https://api.nemopay.net/services/POSS3/loginBadge2?system_id=payutc&app_key="+WEEZEVENT_APP_KEY+"",{
    method:'POST',
    body: JSON.stringify({badge_id:userUid.toString(), pin:userPin.toString()}),
    headers: {
      'Content-Type': 'application/json',
      'Nemopay-Version': '2018-07-03',
},
  })
  .then(res => res.json())
  .then(
    (result)=>
    {
      success(result)
    },
    (err)=>
    {
      error(err)
    }
  )
  .catch(
    (err)=>{
      error(err)
    }
  )
}
