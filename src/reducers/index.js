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
      state = Object.assign({}, state, {errorsList:action.error})
      return state;

    case DELETE_MENU_REQUEST:
      return state;

    case DELETE_MENU_SUCCESS:
      return state;

    case DELETE_MENU_ERROR:
      state = Object.assign({}, state, {errorsList:action.error})
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
      state = Object.assign({}, state, {errorsList:action.error})
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
    case VALIDATE_MENU_ERROR:
      state = Object.assign({}, state, {errorsList:action.error})
      return state;


      case DELETE_ERROR:
        state = Object.assign({}, state, {errorsList:null})
        return state;

    default:
      return state;
  }
}

export default combineReducers({
  menus,
});
