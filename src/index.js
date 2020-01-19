import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.scss';
import { createStore } from "./api/state";
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root')
);
