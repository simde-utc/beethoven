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
  DELETE_ERROR
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

export default combineReducers({
  menus,
  errors
});
