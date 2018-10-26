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

  cas : {
    badgeuse : false,
    connected : false,
    userUid : null,
    userPin : null,
    sessionId : null,
    username : null,
    redirected : false
  },

  vente: {
    loaded : false,
    listCateg : [],
    id_Cated : 3,
    selectedArticles : [],
    loadedArt : false,
    listArticles : [],
    event_id : null,
    picked : false
  },
  achats: {
    clientUid : null,
    state_transaction : 'listen',
    info_client : null
  },

  webTV: {
    tvLink : null,
    enableMessages : false,
    messages : []
  },

  admin : {
    AdminNav : null,
    webTv1Url : null,
    webTv2Url : null,
    webTv1Messages : false,
    webTv2Messages : false
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
