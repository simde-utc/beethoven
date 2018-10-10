import { combineReducers} from 'redux';
import {
  UPDATE_NAVINDEX,
  GET_MENUS_REQUEST,
  GET_MENUS_ERROR,
  GET_MENUS_SUCCESS,
  DELETE_MENU_ERROR,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  GET_LIST_SUCCESS,
  GET_LIST_ERROR,
  GET_LIST_REQUEST,
  GOTO_LOGIN,
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
  DELETE_ALL_ARTICLES
} from "../Constants";

const INITIAL_STATE = {
 selectedArticles: []
}

function cas(state={}, action){
  switch(action.type){
    case LOGIN_ERROR:
      state = Object.assign({}, state,{
        authent: false,
        sessionid: null
      });
      return state;
    case LOGIN_SUCCESS:
      state = Object.assign({}, state,{
        authent: true,
        sessionid: action.sessionid
      });
      return state;
    case LOGIN_REQUEST:
      return state;
    case GOTO_LOGIN:
      if(!action.redirected){
        state = Object.assign({}, state,{
          redirected : true
        });
      }
      return state;
    default:
      return state;
  }
}


function vente(state={}, action){
  switch(action.type){
    case GET_CATEGORIES_ERROR:
      state = Object.assign({}, state,{
        loaded: false,
        listCateg: null
      });
      return state;
    case GET_CATEGORIES_SUCCESS:
      state = Object.assign({}, state,{
        loaded: true,
        listCateg: action.listCateg
      });
      return state;
    case GET_CATEGORIES_REQUEST:
      return state;
    case UPDATE_CATEGORIE:
    state = Object.assign({}, state,
    {
      id_Categ : action.id_Categ
    })
      return state;
    case GET_CHOSEN_ARTICLE:
      if(typeof action.selectedArticles !== 'undefined' && action.selectedArticles.length>0){
        let found = false;
        for(var i = 0; i < action.selectedArticles.length; i++) {
            if (action.selectedArticles[i].newID === action.newID) {
                found = true;
                let arr = [...state.selectedArticles]
                arr[i] = {...arr[i]}        // Object.assign({}, arr[index])
                arr[i]['newQTE'] = arr[i]['newQTE'] + 1
                return {
                  ...state,
                  selectedArticles: arr
                }
                break;
            }
        }
        if(!found){
          let addItem = {
            newID : action.newID,
            newNAME : action.newNAME,
            newPRICE : action.newPRICE,
            newQTE : 1
          }
          return {
            ...state,
            selectedArticles : [...state.selectedArticles, addItem]
          }
        }
        }else{
          let newList = [];
          newList.push({
            newID : action.newID,
            newNAME : action.newNAME,
            newPRICE : action.newPRICE,
            newQTE : 1
          })
          return {
            ...state,
            selectedArticles : newList
          }
        }
    case DELETE_ARTICLE:
      let arr = [...state.selectedArticles];
      const res = arr.filter((item) =>  item.newID !== action.newID);
      return {
        ...state,
        selectedArticles: res
      }
      break;
    case DELETE_ALL_ARTICLES:
      return {
        ...state,
        selectedArticles: []
      }
    case GET_ARTICLES_REQUEST:
      return state;
    case GET_ARTICLES_ERROR:
      state = Object.assign({}, state,{
        loadedArt: null,
        listArticles: null
      });
      return state;
    case GET_ARTICLES_SUCCESS:
      state = Object.assign({}, state,{
        loadedArt: true,
        listArticles: action.listArticles
      });
      return state;
    default:
      return state;
  }
  return state;
}


function menus(state={}, action)
{
  switch(action.type)
  {
    case GET_MENUS_REQUEST:
      return state;

    case GET_MENUS_SUCCESS:
      state = Object.assign({}, state,
        {
          listMenus : action.listMenus
        });
        return state;

    case GET_MENUS_ERROR:
      return state;

    case DELETE_MENU_REQUEST:
      return state;

    case DELETE_MENU_SUCCESS:
      return state;

    case DELETE_MENU_ERROR:
      return state;

    case UPDATE_NAVINDEX:
      state = Object.assign({}, state,
      {
        NavIndex : action.index
      })
    case GET_LIST_REQUEST:
      return state;

    case GET_LIST_SUCCESS:
      state = Object.assign({}, state,
      {
        listSales: action.listSales
      })
      return state;

    case GET_LIST_ERROR:
      return state;

    default:
      return state;
  }
}


export default combineReducers({
  menus,
  vente,
  cas
});
