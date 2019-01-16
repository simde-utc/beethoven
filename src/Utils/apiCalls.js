import '../App.css';
import {
  SERVICE_URL, FUND_ID, EVENT_ID, PICSOUS_URL, PERSONNAL_URL, GINGER_KEY,
} from './config';
import { getTicketCas } from './utils';
import brequest from './brequest';

import {weezRequest, picsousRequest} from './requests'


//##############################################################################
// API CALL Pour la gestion des MENUS
//##############################################################################

// supprimer un menu de la liste proposée
export const onTrashClick = (buttonId, success, failure) => {
  picsousRequest('POST', 'setMenuClosed', buttonId, 0).then().then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    },
  ).catch((err) => { failure(err); });
};

// reccupérer tous les menus dispos
export const fetchMenus = (success, failure) => {
  picsousRequest('GET', 'menus', null,0)
  .then(res => res.json()).then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    },
  ).catch((err) => { failure(err); });
};

//passer une commande en Servi
export const fetchServed = (id, success, failure) => {
  picsousRequest('POST', 'setMenuServed', id, 0)
    .then((result) => {
      if (result.ok) {
        success(result);
      } else {
        failure(result);
      }
    }).catch((err) => { failure(err); });
};

// remiser les commades des gens de la perm (qui se servent après)
export const changeStaff = (id, success, failure) => {
  picsousRequest('POST', 'setMenuIsStaff', id, 0)
    .then((result) => {
      if (result.ok) {
        success(result);
      } else {
        failure(result);
      }
    }).catch((err) => { failure(err); });
};


// reccupérer liste du menu selectionné
export const fetchMenuList = (idMenu, success, failure) => {
  picsousRequest('GET', 'getorders', idMenu, 0)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

//##################################################################################
//GESTION DE CONNEXION
//##################################################################################



// connexion via badge
export const loginBadge2 = (userUid, userPin, success, error) => {
  weezRequest('POST', 'POSS3', 'loginBadge2', {badge_id:userUid.toString(), pin: userPin.toString()})
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (err) => {
        error(err);
      },
    )
    .catch(
      (err) => {
        error(err);
      },
    );
};


// login par Cas (inutilisé mais nous l'avons laissé si jamais vous voulez changer d'avis)
export const loginCas = (success, failure) => {
  const ticketCas = getTicketCas();
  const serviceurl = SERVICE_URL;
  weezRequest('POST', 'MYACCOUNT', 'loginCas2', { ticket: ticketCas, service: serviceurl })
    .then(res1 => res1.json())
    .then(
      (result) => {
        success(result); // j'ai changé ici je renvoie tout le result et pas que le sessionid
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

export const getUsersRights = (sessionid, success, failure) => {
  weezRequest('POST', 'USERRIGHT', 'getAllMyRights', {}, sessionid)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};



//##################################################################################
//GESTION DE VENTE
//##################################################################################


//reccupération des points de vente de la fondation FUND_ID
export const getLocations = (sessionid, success, failure) => {
  weezRequest('POST', 'POSS3', 'getSalesLocations', { fun_id: FUND_ID, event_id: EVENT_ID }, sessionid)
    .then(res1 => res1.json())
    .then((dataLocation) => {
      success(dataLocation);
    },
    (error) => {
      failure(error);
    }).catch((err) => { failure(err); });
};

//reccupération des catégories du poins de vente
export const getCategories = (sessionid, location, success, failure) => {
  weezRequest('POST', 'POSS3', 'getSalesLocations', { fun_id: FUND_ID, event_id: EVENT_ID }, sessionid)
    .then(res1 => res1.json())
    .then(
      (dataLocation) => {
        const id_Categ = dataLocation[parseInt(location)].categories;
        brequest('apiRequest', 'POST', 'POSS3', 'getCategories', { fun_id: FUND_ID }, sessionid)
          .then(res => res.json())
          .then(
            (result) => {
              const categ = [];
              for (let i = 0; i < id_Categ.length; i++) {
                if (result.find(o => o.id === id_Categ[i])) categ.push(result.find(o => o.id === id_Categ[i]));
              }
              categ.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
              success(categ);
            },
            (erro) => {
              failure(erro);
            },
          ).catch((err) => { failure(err); });
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

// Réccupérer les articles par catégorie
export const getArticles = (sessionid, success, failure) => {
  weezRequest('POST', 'POSS3', 'getArticles', { fun_id: FUND_ID }, sessionid)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};


// transaction des items dans la cardlist
export const setUserTransaction = (sessionid, badge, list_achats, success, failure) => {
  const d = [];
  for (let i = 0; i < list_achats.length; i++) {
    const item = list_achats[i];
    d.push([item.newID, item.newQTE]);
  }
  const achats = JSON.stringify(d);
  weezRequest('POST', 'POSS3', 'transaction', { fun_id: FUND_ID, badge_id: badge, obj_ids: achats }, sessionid)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

// récupérer les infos du client
export const getUserInformation = (sessionId, badge, success, failure) => {
  weezRequest('POST', 'POSS3', 'getBuyerInfo', { badge_id: badge }, sessionId)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

// cancel une transaction
export const cancelUserTransaction = (sessionId, pur_id, success, failure) => {
  weezRequest('POST', 'POSS3', 'cancel', { fun_id: FUND_ID, pur_id }, sessionId)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};


//########################################################################
//GESTION ADMIN + WEB TV
//########################################################################

// Gestion des WebTV
export const getTvUrl = (idTv, success, failure) => {
  picsousRequest('GET', 'webtvConfiguration', '?tv='+idTv, 0, 1)
    .then(res => res.json())
    .then((result) => {
      if(result[0])
      success(result[0]);
    },
    (err) => {
      failure(err);
    }).catch((err) => { failure(err); });
};



export const setTvUrl = (idTv, url, photo, messages, is_new, success, failure) => {
  let toSend;
  if(url !== null){
    toSend = picsousRequest('POST','webtvConfiguration',
    {tv:idTv, url:url, photo:null, enable_messages: messages, is_image:false}, 1)
  }
  else if(photo!== null && is_new===0){
    toSend =  picsousRequest('POST','webtvConfiguration',
    {tv:idTv, url:photo, photo:null, enable_messages: messages, is_image:true}, 1)
  }

  else if(photo!== null && is_new===1){
    const data = new FormData()
    data.append('photo', photo, photo.name)
    data.append('tv', idTv)
    data.append('is_image', true)
    data.append('enable_messages', messages)
    toSend =  fetch(

      `${PICSOUS_URL}webtvConfiguration/`,
      {
        method: 'POST',
        body: data,
        headers: {
          'Accept':'application/json',
        },
      },
    )
  }
  toSend.then(res => res.json())
  .then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    },
  ).catch((err) => { failure(err); });

};

// reccupération de la liste de messages
export const fetchMessagesList = (success, failure) => {
  picsousRequest('GET', 'messages', null, 0)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};

// ajouter un message à la liste
export const addMessageToList = (title, text, success, failure) => {
  picsousRequest('POST', 'messages', {title:title, text:text}, 1)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};


// supprimer un message de la liste
export const deleteMessageFromList = (idMessage, success, failure) => {
  picsousRequest('DELETE', 'messages', idMessage, 0)
    .then((result) => { success(result); })
    .catch((err) => { failure(err); });
};

// reccupérer la liste des urls par defaut
export const getUrls = (success, failure) => {
  picsousRequest('GET', 'urls', null, 0)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};


export const fetchToServe = (success, failure) => {
  picsousRequest('GET', 'getOrdersForTv', null, 0)
    .then(res => res.json())
    .then(
      (result) => {
        success(result);
      },
      (error) => {
        failure(error);
      },
    ).catch((err) => { failure(err); });
};




export const getGoodiesList = (dateDebut, dateFin, quantity, success, failure) => {
  fetch(`${PERSONNAL_URL}TicketsList?random=${Math.random()}`, {
    method: 'POST',
    body: JSON.stringify({
      start: dateDebut,
      end: dateFin,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(
      (result) => {
        const data = [].concat.apply([], result);
        const toSend = [];
        let i = 0;

        for (i = 0; i < quantity; i++) {
          const toAdd = data[Math.floor(Math.random() * data.length)];
          toAdd in toSend ? i-- : toSend.push(toAdd);
        }
        success(toSend);
      },

      (error) => {
        failure(error);
      },
    );
};

//Bloquer un user :
export const blockUser = (sessionId,clientUid,date_fin,success,failure)=>{
  weezRequest('POST','BLOCKED','walletAutocomplete', {queryString: clientUid, "lookup_only": "tag"}, sessionId)
  .then(res =>res.json())
  .then(
      (resultWallet) =>{
        brequest('apiRequest', 'POST', 'BLOCKED', 'block', {fun_id: FUND_ID, raison: "Comportement Innacceptable", usr_id: resultWallet[0].user_id, wallet: resultWallet[0].id, date_fin: date_fin},sessionId)
        .then(res => res.json())
        .then(
          (result) => {
            success(result);
          },
          (error) => {
            failure(error);
          }
        ).catch((err)=>{failure(err)})
      },
      (error) => {
        failure(error);
      }
  ).catch((err)=>{failure(err)})
}

//Recupération de tous les user bloqués :
export const getAllBlockedUsers = (sessionId,success,failure)=>{
  weezRequest('POST','BLOCKED','getAll', {fun_id: FUND_ID}, sessionId)
  .then(res =>res.json())
  .then(
      (result) =>{
        success(result);
      },
      (error) => {
        failure(error);
      }
  ).catch((err)=>{failure(err)})
}

export const gingerApiRequest = (login, success, failure) => {
  fetch(`${PERSONNAL_URL}ginger/${login}/${GINGER_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((result) => {
      success(result);
    },
    (err) => {
      failure(err);
    }).catch((err) => { failure(err); });
};

//send email lost card
export const sendLostCard = (login,success,failure) => {
  fetch(`${PERSONNAL_URL}ginger/${login}/${GINGER_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then((result) => {
      var mail = result.mail
      fetch(`${PICSOUS_URL}sendLostCard`, {
        method: 'POST',
        body: JSON.stringify({
          mail
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(
          (result2) => {
            success(result2);
          },
          (error2) => {
            failure(error2);
          },
        ).catch((err) => { failure(err); });
    },
    (err) => {
      failure(err);
    }).catch((err) => { failure(err); });
};
