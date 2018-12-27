import '../App.css';
import {
  SERVICE_URL, FUND_ID, EVENT_ID, PICSOUS_URL, PERSONNAL_URL, GINGER_KEY,
} from './config';
import { getTicketCas } from './utils';
import brequest from './brequest';


// supprimer un menu
export const onTrashClick = (buttonId, success, failure) => {
  brequest('picsousRequest', 'POST', null, 'setMenuClosed', buttonId, null).then().then(
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
  brequest('picsousRequest', 'GET', null, 'menus', null, null).then(res => res.json()).then(
    (result) => {
      success(result);
    },
    (error) => {
      failure(error);
    },
  ).catch((err) => { failure(err); });
};

// passer une commande en Servi
export const fetchServed = (id, success, failure) => {
  brequest('picsousRequest', 'POST', null, 'setMenuServed', id, null)
    .then((result) => {
      if (result.ok) {
      // fetchMenuList(this.state.NavIndex)
        success(result);
      } else {
        failure(result);
      }
    }).catch((err) => { failure(err); });
};

// remiser les commades des gens de la perm (qui se servent après)
export const changeStaff = (id, success, failure) => {
  brequest('picsousRequest', 'POST', null, 'setMenuIsStaff', id, null)
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
  brequest('picsousRequest', 'GET', null, 'getorders', idMenu, null)
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



// connexion via badge
export const loginBadge2 = (userUid, userPin, success, error) => {
  brequest('apiRequest', 'POST', 'POSS3', 'loginBadge2', { badge_id: userUid.toString(), pin: userPin.toString() }, null)
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


// login par Cas
export const loginCas = (success, failure) => {
  const ticketCas = getTicketCas();
  const serviceurl = SERVICE_URL;
  brequest('apiRequest', 'POST', 'MYACCOUNT', 'loginCas2', { ticket: ticketCas, service: serviceurl }, null)
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


export const getLocations = (sessionid, success, failure) => {
  brequest('apiRequest', 'POST', 'POSS3', 'getSalesLocations', { fun_id: FUND_ID, event_id: EVENT_ID }, sessionid)
    .then(res1 => res1.json())
    .then((dataLocation) => {
      success(dataLocation);
    },
    (error) => {
      failure(error);
    }).catch((err) => { failure(err); });
};

export const getCategories = (sessionid, location, success, failure) => {
  brequest('apiRequest', 'POST', 'POSS3', 'getSalesLocations', { fun_id: FUND_ID, event_id: EVENT_ID }, sessionid)
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

// Chopper les articles par categ
export const getArticles = (sessionid, success, failure) => {
  brequest('apiRequest', 'POST', 'POSS3', 'getArticles', { fun_id: FUND_ID }, sessionid)
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
  brequest('apiRequest', 'POST', 'POSS3', 'transaction', { fun_id: FUND_ID, badge_id: badge, obj_ids: achats }, sessionid)
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
  brequest('apiRequest', 'POST', 'POSS3', 'getBuyerInfo', { badge_id: badge }, sessionId)
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


// Gestion des WebTV
export const getTvUrl = (idTv, success, failure) => {
  brequest('picsousRequest', 'GET', null, 'webTv', idTv, null)
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
  brequest('apiRequest', 'POST', 'POSS3', 'cancel', { fun_id: FUND_ID, pur_id }, sessionId)
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


export const setTvUrl = (idTv, url, messages, success, failure) => {
  fetch(
    `${PICSOUS_URL}webTv/setConfig/`,
    {
      method: 'POST',
      body: JSON.stringify({
        id: idTv,
        url,
        messages,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
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

// reccupération de la liste de messages
export const fetchMessagesList = (success, failure) => {
  brequest('picsousRequest', 'GET', null, 'messages/', null, null)
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
  fetch(
    `${PICSOUS_URL}messages/`,
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
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
  fetch(
    `${PICSOUS_URL}messages/${idMessage}/`,
    {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((result) => { success(result); })
    .catch((err) => { failure(err); });
};

// reccupérer la liste des urls par defaut
export const getUrls = (success, failure) => {
  fetch(
    `${PICSOUS_URL}urls/?random=${Math.random()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
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
  fetch(`${PICSOUS_URL}getOrdersForTv/?random=${Math.random()}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
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

export const getUsersRights = (sessionid, success, failure) => {
  brequest('apiRequest', 'POST', 'USERRIGHT', 'getAllMyRights', {}, sessionid)
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
  brequest('apiRequest','POST','BLOCKED','walletAutocomplete', {queryString: clientUid, "lookup_only": "tag"}, sessionId)
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
  brequest('apiRequest','POST','BLOCKED','getAll', {fun_id: FUND_ID}, sessionId)
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
