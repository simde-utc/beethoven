import {applyMiddleware, createStore, compose} from 'redux'
import beethoven from './reducers'
import thunk from "redux-thunk";


export const store = createStore
(
  beethoven,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)