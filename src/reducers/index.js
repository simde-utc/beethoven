import { combineReducers } from 'redux';
import {
  UPDATE_NAVINDEX,
  GET_MENUS_REQUEST,
  GET_MENUS_ERROR,
  GET_MENUS_SUCCESS,
  DELETE_MENU_ERROR,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_ERROR,
  GET_TOSERVE_REQUEST,
  GET_TOSERVE_SUCCESS,
  GET_TOSERVE_ERROR,
  VALIDATE_MENU_ERROR,
  VALIDATE_MENU_REQUEST,
  VALIDATE_MENU_SUCCESS,
  SET_STAFF_ERROR,
  SET_STAFF_SUCCESS,
  SET_STAFF_REQUEST,
  ADD_ALERT,
  DELETE_ALERT,
  BADGEUSE_IS_PRESENT,
  SET_USER_CONNECTED,
  GET_USER_PIN,
  GET_USER_UID,
  LOGIN_BADGE_REQUEST,
  LOGIN_BADGE_SUCCESS,
  LOGIN_BADGE_ERROR,
  DISCONNECT,
  REDIRECT_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  UPDATE_CATEGORIE,
  GET_CHOSEN_ARTICLE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  DELETE_ARTICLE,
  DELETE_ALL_ARTICLES,
  GET_TVLINK_ERROR,
  GET_TVLINK_REQUEST,
  GET_TVLINK_SUCCESS,
  SET_TVLINK_ERROR,
  SET_TVLINK_REQUEST,
  SET_TVLINK_SUCCESS,
  GET_MESSAGES_LIST_ERROR,
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_ERROR,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_ERROR,
  GET_DEFAULT_URL_REQUEST,
  GET_DEFAULT_URL_SUCCESS,
  GET_DEFAULT_URL_ERROR,
  SET_TRANSACTION_SUCCESS,
  SET_TRANSACTION_REQUEST,
  SET_TRANSACTION_ERROR,
  SET_TRANSACTION_STATE,
  GET_CLIENT_UID,
  GET_CLIENT_INFO_REQUEST,
  GET_CLIENT_INFO_SUCCESS,
  GET_CLIENT_INFO_ERROR,
  SET_CLIENT_STATE,
  CANCEL_ARTICLE_REQUEST,
  CANCEL_ARTICLE_SUCCESS,
  CANCEL_ARTICLE_ERROR,
  DELETE_ARTICLE_CANCELED,
  GET_EVENT_ARTICLES,
  GET_SALES_LOCATION_ERROR,
  GET_SALES_LOCATION_SUCCESS,
  GET_SALES_LOCATION_REQUEST,
  RESTART,
  UPDATE_ADMIN_NAV,
  GET_RIGHTS_SUCCESS,
  GET_RIGHTS_REQUEST,
  GET_RIGHTS_ERROR,
  GET_GOODIES_REQUEST,
  GET_GOODIES_SUCCESS,
  GET_GOODIES_ERROR,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  SET_BLOCKED_STATE,
  CHANGE_PANEL,
  GINGER_SUCCESS,
  GINGER_ERROR,
  GET_BLOCKED_USERS_SUCCESS,
  GET_BLOCKED_USERS_ERROR,
  GET_BLOCKED_USERS_REQUEST,
  SEND_LOST_ERROR,
  SEND_LOST_REQUEST,
  SEND_LOST_SUCCESS,
  RESET_LOST
} from '../constants';

function general(state = {}, action) {
  switch (action.type) {
    case CHANGE_PANEL:
      state = Object.assign({}, state,
        {
          activePanel: action.activePanel,
        });
      return state;


    default:
      return state;
  }
}

function menus(state = {}, action) {
  switch (action.type) {
    case GET_MENUS_REQUEST:
      return state;

    case GET_MENUS_SUCCESS:
      state = Object.assign({}, state,
        {
          MenuList: action.MenuList,
        });
      return state;


    case DELETE_MENU_REQUEST:
      return state;

    case DELETE_MENU_SUCCESS:
      const newListMenu = action.MenuList.filter(i => i.article.id_payutc.toString() !== action.idMenu.toString());
      state = Object.assign({}, state,
        {
          MenuList: newListMenu,
          NavIndex: null,
          listSales : []
        });
      return state;

    case UPDATE_NAVINDEX:
      state = Object.assign({}, state,
        {
          NavIndex: action.index,
          loading: true,
        });
        return state

    case GET_LIST_REQUEST:
      return state;

    case GET_LIST_SUCCESS:
      state = Object.assign({}, state,
        {
          loading: false,
          listSales: action.listSales,

        });
      return state;


    case VALIDATE_MENU_REQUEST:
      const validated = action.listSales.orders.find(elt => elt.id_transaction === action.idMenu);
      validated.served = !validated.served;
      const newListSales = action.listSales.orders.filter(i => i.id_transaction !== action.idMenu);
      newListSales.push(validated);
      const newListInformation = action.listSales.menu;
      state = Object.assign({}, state,
        {
          listSales: { menu: newListInformation, orders: newListSales },
        });
      return state;


    case VALIDATE_MENU_SUCCESS:
      return state;

    case SET_STAFF_REQUEST:
      const staffed = state.listSales.orders.find(elt => elt.id_transaction === action.idMenu);
      staffed.is_staff = !staffed.is_staff;
      const newListSales1 = state.listSales.orders.filter(i => i.id_transaction !== action.idMenu);
      newListSales1.push(staffed);
      const newListInformation1 = state.listSales.menu;
      state = Object.assign({}, state,
        {
          listSales: { menu: newListInformation1, orders: newListSales1 },
        });
      return state;


    case SET_STAFF_SUCCESS:
      return state;

    case GET_TOSERVE_SUCCESS:
      state = Object.assign({}, state,
        {
          listToServe: action.listToServe,
        });
      return state;

    case GET_TOSERVE_REQUEST:
      return state;


    default:
      return state;
  }
}


// reducer gérant les erreurs pour toute l'application
// Il faut absolument mettre ses GET_ et POST_ ERROR ici pour une
// gestion automatique
function alerts(state = {}, action) {
  let alertList;

  switch (action.type) {
    case GET_MENUS_ERROR:
      alertList = state.alertList.slice(); // slice permet de copier la valeur actuelle
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case DELETE_MENU_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;
    case GET_LIST_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case VALIDATE_MENU_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case LOGIN_BADGE_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case LOGIN_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GET_TVLINK_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case SET_TVLINK_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;
    case GET_TOSERVE_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;
    case GET_SALES_LOCATION_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;
    case SET_TRANSACTION_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;
    case GET_CLIENT_INFO_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GET_MESSAGES_LIST_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case ADD_MESSAGE_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case DELETE_MESSAGE_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;


    case CANCEL_ARTICLE_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case SET_STAFF_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;


    case GET_RIGHTS_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case ADD_ALERT:
      alertList = state.alertList.slice();
      alertList.push({ type: action.status, message: action.information });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GET_DEFAULT_URL_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GET_GOODIES_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GINGER_ERROR:
      alertList = state.alertList.slice();
      alertList.push({ type: 'danger', message: action.error });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;


    case SET_TVLINK_SUCCESS:
      alertList = state.alertList.slice();
      alertList.push({ type: 'success', message: action.message });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

    case GET_GOODIES_REQUEST:
      alertList = state.alertList.slice();
      alertList.push({ type: 'success', message: action.message });
      state = Object.assign({}, state, {
        alertList,
      });
      return state;


    case DELETE_ALERT:
      alertList = state.alertList.slice();
      alertList.shift();
      state = Object.assign({}, state, {
        alertList,
      });
      return state;

      case BLOCK_USER_ERROR:
      alertList = state.alertList.slice()
      alertList.push({type:'danger', message:action.error});
      state = Object.assign({}, state, {
        alertList : alertList
      })
      return state;

      case GET_BLOCKED_USERS_ERROR:
        alertList = state.alertList.slice()
        alertList.push({type:'danger', message:action.error});
        state = Object.assign({}, state, {
          alertList : alertList
        })
        return state;
      case SEND_LOST_ERROR:
        alertList = state.alertList.slice()
        alertList.push({type:'danger', message:action.error});
        state = Object.assign({}, state, {
          alertList : alertList
        })
        return state;
    default:
      return state;
  }
}


function cas(state = {}, action) {
  switch (action.type) {
    case BADGEUSE_IS_PRESENT:
      state = Object.assign({}, state, {
        badgeuse: action.badgeuse,
      });
      return state;

    case SET_USER_CONNECTED:
      state = Object.assign({}, state, {
        connected: true,
      });
      return state;

    case GINGER_SUCCESS:
      state = Object.assign({}, state, {
        userUid: action.userInfo.badge_uid,
        userMail: action.userInfo.mail,
      });
      return state;

    case GET_USER_UID:
      state = Object.assign({}, state, {
        userUid: action.userUid,
      });
      return state;

    case GET_USER_PIN:
      state = Object.assign({}, state, {
        userPin: action.userPin,
      });
      return state;

    case LOGIN_BADGE_REQUEST:
      return state;

    case LOGIN_BADGE_SUCCESS:
      state = Object.assign({}, state, {
        sessionId: action.sessionId.sessionid,
        username: action.sessionId.username,
        connected: true,
      });
      return state;

    case LOGIN_BADGE_ERROR:
      state = Object.assign({}, state, {
        userUid: null,
        userPin: null,
        connected: false,
      });
      return state;

    case LOGIN_ERROR:
      state = Object.assign({}, state, {
        connected: false, // changé authent par connected
        sessionId: null,
      });
      return state;

    case LOGIN_SUCCESS:
      state = Object.assign({}, state, {
        connected: true, // changé authent par connected
        sessionId: action.sessionId,
        username: action.username,
      });
      return state;

    case LOGIN_REQUEST:
      return state;

    case REDIRECT_LOGIN:
      state = Object.assign({}, state,
        {
          redirected: true,
        });
      return state;


    case DISCONNECT:
      state = Object.assign({}, state, {
        userUid: null,
        userPin: null,
        connected: false,
        sessionId: null,
        username: null,
        rightsList: null,
      });
      return state;


    case GET_RIGHTS_REQUEST:
      return state;

    case GET_RIGHTS_SUCCESS:

      state = Object.assign({}, state, {
        rightsList: action.rightsList,
      });
      return state;


    default:
      return state;
  }
}


function vente(state = {}, action) {
  switch (action.type) {
    case GET_EVENT_ARTICLES:
      state = Object.assign({}, state, {
        event_id: action.event_id,
        picked: true,
      });
      return state;
    case GET_SALES_LOCATION_REQUEST:
      return state;
    case GET_SALES_LOCATION_SUCCESS:
      state = Object.assign({}, state, {
        listLocation: action.listLocation,
      });
      return state;
    case GET_CATEGORIES_ERROR:
      state = Object.assign({}, state, {
        loaded: false,
        listCateg: [],
      });
      return state;
    case GET_CATEGORIES_SUCCESS:
      state = Object.assign({}, state, {
        loaded: true,
        listCateg: action.listCateg,
        id_Categ: action.id_Categ,
      });
      return state;
    case GET_CATEGORIES_REQUEST:
      return state;
    case UPDATE_CATEGORIE:
      state = Object.assign({}, state,
        {
          id_Categ: action.id_Categ,
        });
      return state;
    case GET_CHOSEN_ARTICLE:
      if (typeof action.selectedArticles !== 'undefined' && action.selectedArticles.length > 0) {
        let found = false;
        for (let i = 0; i < action.selectedArticles.length; i++) {
          if (action.selectedArticles[i].newID === action.newID) {
            found = true;
            const arr = [...state.selectedArticles];
            arr[i] = { ...arr[i] };
            arr[i].newQTE = arr[i].newQTE + 1;
            return {
              ...state,
              selectedArticles: arr,
            };
          }
        }
        if (!found) {
          const addItem = {
            newID: action.newID,
            newNAME: action.newNAME,
            newPRICE: action.newPRICE,
            newQTE: 1,
          };
          return {
            ...state,
            selectedArticles: [...state.selectedArticles, addItem],
          };
        }
      } else {
        const newList = [];
        newList.push({
          newID: action.newID,
          newNAME: action.newNAME,
          newPRICE: action.newPRICE,
          newQTE: 1,
        });
        return {
          ...state,
          selectedArticles: newList,
        };
      }
      return state

    case DELETE_ARTICLE:
      const arr = [...state.selectedArticles];
      const res = arr.filter(item => item.newID !== action.newID);
      return {
        ...state,
        selectedArticles: res,
      };
    case DELETE_ALL_ARTICLES:
      return {
        ...state,
        selectedArticles: [],
      };
    case GET_ARTICLES_REQUEST:
      return state;
    case GET_ARTICLES_ERROR:
      state = Object.assign({}, state, {
        loadedArt: false,
        listArticles: [],
      });
      return state;
    case GET_ARTICLES_SUCCESS:
      state = Object.assign({}, state, {
        loadedArt: true,
        listArticles: action.listArticles,
      });
      return state;
    case SET_TRANSACTION_SUCCESS:
      state = Object.assign({}, state, {
        selectedArticles: [],
      });
      return state;
    case RESTART:
      state = Object.assign({}, state, {
        picked: false,
        event_id: null,
      });
      return state;
    default:
      return state;
  }
}

function webTV(state = {}, action) {
  switch (action.type) {
    case GET_TVLINK_REQUEST:
      return state;

    case GET_TVLINK_SUCCESS:
      state = Object.assign({}, state, {
        tvLink: action.data,
        enableMessages: action.data.enable_messages,
      });
      return state;

    case GET_MESSAGES_LIST_REQUEST:
      return state;

    case GET_MESSAGES_LIST_SUCCESS:
      state = Object.assign({}, state, {
        messages: action.messages,
      });
      return state;

    case ADD_MESSAGE_REQUEST:
      return state;

    case ADD_MESSAGE_SUCCESS:
      const messages = state.messages.slice();
      messages.unshift(action.data);
      state = Object.assign({}, state, {
        messages,
      });
      return state;

    case DELETE_MESSAGE_REQUEST:
      return state;

    case DELETE_MESSAGE_SUCCESS:
      const newMessages = state.messages.filter(mymessage => mymessage.id !== action.idMessage);
      state = Object.assign({}, state, {
        messages: newMessages,
      });
      return state;


    case SET_TVLINK_REQUEST:
      return state;


    default:
      return state;
  }
}

function achats(state = {}, action) {
  switch (action.type) {
    case GET_CLIENT_UID:
      state = Object.assign({}, state, {
        clientUid: action.clientUid,
      });
      return state;
    case SET_TRANSACTION_STATE:
      state = Object.assign({}, state, {
        state_transaction: action.state_transaction,
      });
      return state;
    case SET_TRANSACTION_REQUEST:
      state = Object.assign({}, state,{
        state_transaction : 'loading'
      });
      return state;
    case SET_TRANSACTION_SUCCESS:
      if (!action.info_transaction.error) {
        state = Object.assign({}, state, {
          state_transaction: 'success',
          info_transaction: action.info_transaction,
        });
      } else {
        state = Object.assign({}, state, {
          state_transaction: 'failed',
          info_transaction: action.info_transaction,
        });
      }
      return state;
    case GET_CLIENT_INFO_REQUEST:
      return state;
    case GET_CLIENT_INFO_SUCCESS:
      state = Object.assign({}, state, {
        info_client: action.info_client,
      });
      return state;
    case SET_CLIENT_STATE:
      state = Object.assign({}, state, {
        info_client: null,
      });
      return state;
    case CANCEL_ARTICLE_REQUEST:
      return state;
    case CANCEL_ARTICLE_SUCCESS:
      const tab = state.info_client.last_purchases;
      const deletedActualized = tab.filter(function (t) {
        return t.pur_id !== action.deleted_id;
      });
      return {
        ...state,
        cancel : action.cancel,
        deleted_id : action.deleted_id,
        info_client: {
          ...state.info_client,
          last_purchases: deletedActualized
        }
      }

    case DELETE_ARTICLE_CANCELED:
      return state;
    default:
      return state;
  }
}


function admin(state = {}, action) {
  switch (action.type) {
    case UPDATE_ADMIN_NAV:
      state = Object.assign({}, state, {
        AdminNav: action.AdminNav,
      });
      return state;

    case GET_TVLINK_SUCCESS:
      switch (action.idTv) {
        case 1:
          state = Object.assign({}, state, {
            webTv1Url: action.data.url,
            webTv1Messages: action.data.enable_messages,
          });
          break;

        case 2:
          state = Object.assign({}, state, {
            webTv2Url: action.data.url,
            webTv2Messages: action.data.enable_messages,
          });
          break;

        default:
          break;
      }
      return state;

    case SET_TVLINK_SUCCESS:
      switch (action.idTv) {
        case 1:
          state = Object.assign({}, state, {
            webTv1Url: action.tvLink,
          });
          break;

        case 2:
          state = Object.assign({}, state, {
            webTv2Url: action.tvLink,
          });
          break;

        default:
          break;
      }
      return state;

    case GET_DEFAULT_URL_REQUEST:
      return state;

    case GET_DEFAULT_URL_SUCCESS:
      state = Object.assign({}, state, {
        urls: action.urls,
      });
      return state

    case GET_GOODIES_REQUEST:
      return state;

    case GET_GOODIES_SUCCESS:
    state = Object.assign({}, state, {
      goodiesList: action.goodiesList
    })
    return state

    case BLOCK_USER_REQUEST:
    return state;

    case BLOCK_USER_SUCCESS:
    state = Object.assign({}, state, {
      blocage: action.blocage,
      blocked: 'effective'
    })
    return state;

    case SET_BLOCKED_STATE:
      state = Object.assign({}, state,{
        blocked : action.blocked
      })
      return state;

    case GET_BLOCKED_USERS_REQUEST:
      return state;
    case GET_BLOCKED_USERS_SUCCESS:
      state = Object.assign({}, state, {
        list_blockedUsers : action.list_blockedUsers
      })
      return state;
    case SEND_LOST_REQUEST:
      return state;
    case SEND_LOST_SUCCESS:
      state = Object.assign({}, state, {
        sended : action.sended
      })
      return state;
    case RESET_LOST:
      state = Object.assign({}, state, {
        sended : 'listen'
      })
      return state;
    default :
    return state;
  }
}
export default combineReducers({
  general,
  menus,
  alerts,
  cas,
  vente,
  achats,
  webTV,
  admin,
});
