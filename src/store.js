import {applyMiddleware, createStore, compose} from 'redux'
import beethoven from './reducers'
import thunk from "redux-thunk";

const initialStore = {
  menus:{
    NavIndex : null,
    MenuList : [],
    ListSales : [],
    loading : null
  },
  errors:{
    errorsList : []
  },

  utils : {
    badgeuse : false,
    connected : false,
    userUid : null,
    userPin : null,
    sessionId : null,
    username : null
  }
}

export const store = createStore
(
  beethoven,
  initialStore,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
