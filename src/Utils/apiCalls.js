import React, { Component } from 'react';
import '../App.css';
import {WEEZEVENT_APP_KEY, SERVICE_URL, FUND_ID, EVENT_ID} from './config'
import brequest from './brequest'


//supprimer un menu
export const onTrashClick = (buttonId, success, failure)=>{
  brequest('picsousRequest','POST',null, 'setMenuClosed', buttonId, null).then().then(
    (result)=>{
      success(result)
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})
}



//reccupérer tous les menus dispos
export const fetchMenus  = (success, failure)=>{
  brequest('picsousRequest', 'GET', null, 'menus', null, null).then(res=>res.json()).then(
    (result)=>{
      success(result)
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})
}


export const fetchServed = (id, success, failure)=>{
  brequest('picsousRequest', 'POST', null, 'setMenuServed', id, null)
  .then((result)=>{
    if(result.ok){
      //fetchMenuList(this.state.NavIndex)
      success(result)
    } else{
      failure(result)
    }
  }).catch((err)=>{failure(err)})

}



//reccupérer liste du menu selectionné
export const fetchMenuList = (idMenu, success, failure)=>{
  brequest('picsousRequest', 'GET', null, 'getorders', idMenu, null)
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


//connexion via badge
export const loginBadge2 = (userUid, userPin, success, error)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'loginBadge2', {badge_id:userUid.toString(), pin:userPin.toString()}, null)
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



//login par Cas
export const loginCas = (success, failure)=>{
  let ticketCas;
  let serviceurl = SERVICE_URL
  let ticketRegex = /(\?|&)ticket=([^&=]+)/;
  if(ticketRegex.test(window.location.href)){
    let match = ticketRegex.exec(window.location.href);
    ticketCas = match[2];
   }
  brequest('apiRequest', 'POST', 'MYACCOUNT', 'loginCas2', {ticket:ticketCas, service:serviceurl}, null)
  .then(res1 => res1.json())
  .then(
    (result)=>{
      success(result) //j'ai changé ici je renvoie tout le result et pas que le sessionid
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})
}




export const getCategories = (sessionid, success, failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'getSalesLocations', {fun_id:FUND_ID, event_id:EVENT_ID},sessionid)
  .then(res1 => res1.json())
  .then(
    (dataLocation) => {
      let id_Categ = dataLocation[0].categories;
      brequest('apiRequest', 'POST', 'POSS3', 'getCategories', {fun_id:FUND_ID},sessionid)
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
        ).catch((err)=>{failure(err)})
    },
    (error) => {
        failure(error)
    }).catch((err)=>{failure(err)})
}

// Chopper les articles par categ
export const getArticles = (sessionid, success, failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'getArticles', {fun_id:FUND_ID},sessionid)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
      success(result);
    },
    (error) => {
      failure(error);
    }
  ).catch((err)=>{failure(err)})
}


//transaction des items dans la cardlist
export const setUserTransaction = (sessionid, list_achats, success, failure)=>{
  fetch("https://api.nemopay.net/services/POSS3/transaction?system_id=payutc&app_key="+WEEZEVENT_APP_KEY+
  "&sessionid="+sessionid+"", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fun_id: 2,
        obj_ids: list_achats // format poss ? d.push([item.id, item.quantity]);
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        success(result);
      },
      (error) => {
        failure(error);
      }
    ).catch((err)=>{failure(err)})
}
