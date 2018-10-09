import React, { Component } from 'react';
import '../App.css';
import { APPKEY, BEETH } from './config'



export const loginCas = (success, failure)=>{
  let ticketCas;
  let serviceurl = 'http://localhost:3000'
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(window.location.href)){
    let match = ticketRegex.exec(window.location.href);
    ticketCas = match[2];
   }
  fetch("https://api.nemopay.net/services/MYACCOUNT/loginCas2?system_id=payutc&app_key="+APPKEY+"", {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Nemopay-Version': '2018-07-03',
  },
  body:  '{"ticket":"'+ticketCas+'","service":"'+serviceurl+'"}',
  })
  .then(res1 => res1.json())
  .then(
    (result)=>{
      success(result.sessionid)
    },
    (error)=>{
      failure(error)
    }
  )
}

export const onTrashClick = (buttonId, success, failure)=>{
  fetch(
    "http://37.139.25.111/setMenuClosed/" + buttonId +"?random="+Math.random(),
    {
      method:'POST',
      mode:'cors',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }).then().then(
      (result)=>{
        success(result)
      },
      (error)=>{
        failure(error)
      }
    )
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
    )
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
    })
}


export const fetchMenuList = (idMenu, success, failure)=>{
  fetch("http://37.139.25.111/getorders/"+idMenu+"?random="+Math.random(), {
    method: 'GET',
    mode: 'cors',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
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
  )

}

export const getCategories = (sessionid,success,failure)=>{
  fetch("https://api.nemopay.net/services/POSS3/getSalesLocations?system_id=payutc&app_key="+APPKEY+
  "&sessionid="+sessionid+"", {
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
        fetch("https://api.nemopay.net/services/POSS3/getCategories?system_id=payutc&app_key="+APPKEY+
        "&sessionid="+sessionid+"", {
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
              success(categ);
            },
            (erro) => {
              failure(erro);
            }
          )
      },
      (error) => {
          console.log('FailReessourc')
      });
}
