import * as redux from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { apiReducer, APIMiddleware, APIEndpoint2 } from "./index";
import { WEEZEVENT_APP_KEY, WEEZEVENT_SYSTEM_ID, WEEZEVENT_URL, FUND_ID, EVENT_ID, API_URL } from "../config";
import { connectReducer } from "./connect";
import { internalReducer } from "./internal";
import { SalesLocation, Category, Article, Transaction, BuyerInformations, BlockedUser } from "../models";
import Exoneration from "../models/exoneration";

const middleware = APIMiddleware();

const middlewareParameters = [
  thunk,
  middleware
];

if(process.env.NODE_ENV === "dev") {
  middlewareParameters.push(logger)
}

const reducers = [
  apiReducer,
  connectReducer,
  internalReducer
]

const reducerFn = (state, action) => {
  return reducers.reduce((previousState, reducer) => reducer(previousState, action), state);
}

export function createStore(initial) {
  return redux.createStore(
    reducerFn,
    initial,
    redux.applyMiddleware(...middlewareParameters)
  )
}


const _defaultWeezOptions = {
  parameters: { system_id: WEEZEVENT_SYSTEM_ID, app_key: WEEZEVENT_APP_KEY },
  data: { fun_id: FUND_ID },
  method: "POST"
}

export const salesLocations = new APIEndpoint2(
  `${WEEZEVENT_URL}/POSS3/getSalesLocations`,
  SalesLocation, {
    ..._defaultWeezOptions,
    data: { ..._defaultWeezOptions.data, event_id: EVENT_ID }
  });

export const categories = new APIEndpoint2(
  `${WEEZEVENT_URL}/POSS3/getCategories`,
  Category, _defaultWeezOptions
);

export const articles = new APIEndpoint2(
  `${WEEZEVENT_URL}/POSS3/getArticles`,
  Article, _defaultWeezOptions
);

export const transaction = new APIEndpoint2(
  `${WEEZEVENT_URL}/POSS3/transaction`,
  Transaction, _defaultWeezOptions
);

export const buyerInformations = new APIEndpoint2(
  `${WEEZEVENT_URL}/POSS3/getBuyerInfo`,
  BuyerInformations, _defaultWeezOptions
)

export const blockedUsers = new APIEndpoint2(
  `${API_URL}/blocked/users`, BlockedUser, {credentials: 'include'}
);

export const exoneration = new APIEndpoint2(
  `${API_URL}/exoneration/`, Exoneration, {credentials: 'include'}
)
