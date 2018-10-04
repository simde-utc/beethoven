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
  GET_LIST_REQUEST
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
  menus
});
