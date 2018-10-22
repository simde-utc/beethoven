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
  VALIDATE_MENU_ERROR,
  VALIDATE_MENU_REQUEST,
  VALIDATE_MENU_SUCCESS,
  ADD_ERROR,
  DELETE_ERROR,
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
  DELETE_ALL_ARTICLES
} from "../constants";

function menus(state={}, action)
{
  let errorsList;

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


    case DELETE_MENU_REQUEST:
      return state;

    case DELETE_MENU_SUCCESS:
      return state;

    case UPDATE_NAVINDEX:
      state = Object.assign({}, state,
      {
        NavIndex : action.index,
        loading : true
      })
    case GET_LIST_REQUEST:
      return state;

    case GET_LIST_SUCCESS:
      state = Object.assign({}, state,
      {
        loading : false,
        listSales: action.listSales

      })
      return state;


    case VALIDATE_MENU_REQUEST :
    return state


    case VALIDATE_MENU_SUCCESS :
    let validated = action.listSales.orders.find(function(elt){
      return elt.id_transaction === action.idMenu
    })
    validated.served = !validated.served;
    let newListSales = action.listSales.orders.filter(i => i.id_transaction !== action.idMenu)
    newListSales.push(validated)
    let newListInformation = action.listSales.menu
    state = Object.assign({}, state,
    {
      listSales : {"menu": newListInformation, "orders": newListSales}
    })

      return state;

    default:
      return state;
  }
}


//reducer gérant les erreurs pour toute l'application
// Il faut absolument mettre ses GET_ et POST_ ERROR ici pour une
//gestion automatique
function errors(state = {}, action)
{
  let errorsList;

  switch(action.type)
  {
    case GET_MENUS_ERROR:
      errorsList = state.errorsList.slice(); //slice permet de copier la valeur actuelle
      errorsList.push(action.error);
      state = Object.assign({}, state, {
        errorsList : errorsList
      })
      return state;

    case DELETE_MENU_ERROR:
      errorsList = state.errorsList.slice();
      errorsList.push(action.error);
      state = Object.assign({}, state, {
                  errorsList : errorsList
      })
        return state;
    case GET_LIST_ERROR:
      errorsList = state.errorsList.slice();
      errorsList.push(action.error);
            state = Object.assign({}, state, {
        errorsList : errorsList
      })
          return state;

    case VALIDATE_MENU_ERROR:
      errorsList = state.errorsList.slice();
      errorsList.push(action.error);
      state = Object.assign({}, state, {
        errorsList : errorsList
      })
      return state;

    case LOGIN_BADGE_ERROR:
      errorsList = state.errorsList.slice()
      errorsList.push(action.error);
      state = Object.assign({}, state, {
        errorsList: errorsList
      })
      return state;

      case LOGIN_ERROR:
        errorsList = state.errorsList.slice()
        errorsList.push(action.error);
        state = Object.assign({}, state, {
          errorsList: errorsList
        })
        return state;




    case DELETE_ERROR:
      errorsList = state.errorsList.slice()
      errorsList.shift();
      state = Object.assign({}, state, {
        errorsList : errorsList
      })
      return state;



    default:
      return state
  }
}


function cas(state={}, action)
{
  switch(action.type)
  {
    case BADGEUSE_IS_PRESENT:
    state = Object.assign({}, state, {
      badgeuse : action.badgeuse
    })
    return state;

    case SET_USER_CONNECTED:
    state = Object.assign({}, state, {
      connected : true
    })
    return state;

    case GET_USER_UID:
    state = Object.assign({}, state,{
      userUid : action.userUid
    })
    return state;

    case GET_USER_PIN:
    state = Object.assign({}, state,{
      userPin : action.userPin
    })
    return state;

    case LOGIN_BADGE_REQUEST:
    return state;

    case LOGIN_BADGE_SUCCESS:
    state = Object.assign({}, state, {
      sessionId : action.sessionId.sessionid,
      username : action.sessionId.username,
      connected : true
    })
    return state;

    case LOGIN_BADGE_ERROR:
      state = Object.assign({}, state, {
        userUid : null,
        userPin : null,
        connected : false
      })
      return state;

    case LOGIN_ERROR:
      state = Object.assign({}, state,{
        connected: false, //changé authent par connected
        sessionId: null
      });
      return state;

    case LOGIN_SUCCESS:
      state = Object.assign({}, state,{
        connected: true, //changé authent par connected
        sessionId: action.sessionId,
        username : action.username
      });
      return state;

    case LOGIN_REQUEST:
      return state;

    case REDIRECT_LOGIN:
      state = Object.assign({}, state,
      {
        redirected : true
      });
      return state;


    case DISCONNECT :
    state = Object.assign({}, state, {
      userUid : null,
      userPin : null,
      connected : false,
      sessionId : null,
      username : null
    })

    default:
    return state
  }
}


function vente(state={}, action){
  switch(action.type){
    case GET_CATEGORIES_ERROR:
      state = Object.assign({}, state,{
        loaded: false,
        listCateg: []
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
        loadedArt: false,
        listArticles: []
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

export default combineReducers({
  menus,
  errors,
  cas,
  vente
});
