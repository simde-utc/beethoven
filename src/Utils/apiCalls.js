import React, { Component } from 'react';
import '../App.css';
import {WEEZEVENT_APP_KEY, SERVICE_URL, FUND_ID, EVENT_ID, PICSOUS_URL} from './config'
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

//passer une commande en Servi
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

//remiser les commades des gens de la perm (qui se servent après)
export const changeStaff = (id, success, failure)=>{
  brequest('picsousRequest', 'POST', null, 'setMenuIsStaff', id, null)
  .then((result)=>{
    if(result.ok){
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


export const getLocations = (sessionid, success, failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'getSalesLocations', {fun_id:FUND_ID, event_id:EVENT_ID},sessionid)
  .then(res1 => res1.json())
  .then((dataLocation) => {
    success(dataLocation)
  },
  (error) => {
      failure(error)
  }).catch((err)=>{failure(err)})
}

export const getCategories = (sessionid,location , success, failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'getSalesLocations', {fun_id:FUND_ID, event_id:EVENT_ID},sessionid)
  .then(res1 => res1.json())
  .then(
    (dataLocation) => {
      let id_Categ = dataLocation[parseInt(location)].categories;
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
      success(result);
    },
    (error) => {
      failure(error);
    }
  ).catch((err)=>{failure(err)})
}


//transaction des items dans la cardlist
export const setUserTransaction = (sessionid, badge, list_achats, success, failure)=>{
  var d = [];
  for (var i = 0; i < list_achats.length; i++) {
      var item = list_achats[i];
      d.push([item.newID, item.newQTE]);
  }
  var achats = JSON.stringify(d);
  brequest('apiRequest', 'POST', 'POSS3', 'transaction', {fun_id:FUND_ID,badge_id:badge, obj_ids: achats},sessionid)
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

//récupérer les infos du client
export const getUserInformation = (sessionId, badge, success, failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'getBuyerInfo', {badge_id:badge},sessionId)
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


//Gestion des WebTV
export const getTvUrl = (idTv, success, failure)=>{
  brequest('picsousRequest', 'GET', null, 'webTv', idTv, null)
  .then(res => res.json())
  .then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    }
  ).catch((err)=>{failure(err)})
}

//cancel une transaction
export const cancelUserTransaction = (sessionId,pur_id,success,failure)=>{
  brequest('apiRequest', 'POST', 'POSS3', 'cancel', {fun_id: FUND_ID, pur_id:pur_id},sessionId)
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


export const setTvUrl = (idTv, url, messages, success, failure)=>{
  fetch(
    PICSOUS_URL+"webTv/setConfig/",
    {
      method : 'POST',
      body : JSON.stringify({"id": idTv,
      "url":url,
      "messages": messages
    }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then(res => res.json())
  .then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    }
  ).catch((err)=>{failure(err)})
}

//reccupération de la liste de messages
export const fetchMessagesList = (success, failure)=>{
  brequest('picsousRequest', 'GET', null, 'messages',null,null)
  .then(res=>res.json())
  .then(
    (result)=>{
      success(result)
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})
}

//ajouter un message à la liste
export const addMessageToList = (title, text, success, failure)=>{
  fetch(
    PICSOUS_URL+"messages/",
    {
      method : 'POST',
      body : JSON.stringify({"title": title,
      "text": text
    }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then(res => res.json())
  .then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    }
  ).catch((err)=>{failure(err)})

}


//supprimer un message de la liste
export const deleteMessageFromList = (idMessage, success, failure)=>{
  fetch(
    PICSOUS_URL+"messages/"+idMessage+"/",
    {
      method : 'DELETE',

      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then((result)=> {success(result)})
  .catch((err)=>{failure(err)})

}

//reccupérer la liste des urls par defaut
export const getUrls = (success, failure)=>{
  fetch(
    PICSOUS_URL+"urls/?random="+Math.random(),
    {
      method : 'GET',
      headers : {
        'Content-Type':'application/json'
      }
    }
  )
  .then(res=>res.json())
  .then(
    (result)=>{
      console.log(result)
      success(result)
    },
    (error)=>{
      failure(error)
    }
  ).catch((err)=>{failure(err)})
}


export const fetchToServe = (success, failure)=>{
  fetch(PICSOUS_URL+"getOrdersForTv/?random="+Math.random(), {
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

export const getUsersRights = (sessionid, success, failure)=>{
  brequest('apiRequest', 'POST', 'USERRIGHT', 'getAllMyRights', {},sessionid)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      }
    ).catch((err)=>{failure(err)})
}
