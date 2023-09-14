import { BaseModel } from "./utils";
import { URLScheme } from "./urls";

import {
  REQUEST_CREATE,
  REQUEST_RETRIEVE,
  REQUEST_LIST,
  REQUEST_UPDATE,
  REQUEST_UPDATE_ONE,
  REQUEST_DELETE_ONE,
  SET_CURRENT,
  SET_CURRENT_ID,
  RESET,
  RESET_CURRENT
} from "./types";
import invariant from "invariant";


/**
 * API Endpoint
 * A set of actions and states for an API
**/
export default class APIEndpoint {
  /*
   * APIEndpoint(url, options)
   * APIEndpoint(url, Model, options)
  */
  constructor(urlScheme, Model = BaseModel, options = {}) {
    if(Model && typeof Model !== 'function') {
      options = Model;
      Model = BaseModel;
    }
    this._urlScheme = URLScheme.fromString(urlScheme);

    const name = options.name || (Model === BaseModel ? "_" : Model.name);
    this._Model = Model;
    this.index = options.index || Symbol(`${name}.INDEX`);
    this.defaultLimit = options.limit || 10;
  }

  _getListURL(state, options) {
    if(state.nextURL !== undefined) {
      return state.nextURL;
    }
    const offset = state.offset || 0;
    const limit = options.limit !== undefined ? options.limit : offset + this.defaultLimit;

    return this._urlScheme.getList(options, state.query || {
      limit,
      offset,
      ...options.parameters
    });
  }

  /**
   * Set the instance pointed by the ID to be the current instance
   * @param {number} id - the id
   * @param {Object} options - options for the url generation
   * @return {Object} - the dispatched action
  **/
  setCurrent(id, options={}) {
    id = id && String(id)
    return (dispatch, getState) => {
      const state = this._getSubState(getState());
      invariant(options.update === undefined || typeof options.update === "boolean",
        `options.update should be a boolean but is ${options.update}`);

      const recycle = !options.update;
      if(state.currentID === id && recycle) {
        return;
      }
      dispatch({
        type: SET_CURRENT_ID,
        index: this.index,
        payload: {
          id,
        }
      });
      if(id === null) {
        return;
      }
      if(recycle) {
        const index = state.index || {};
        const instance = index[id];
        if(instance) {
          dispatch({
            type: SET_CURRENT,
            index: this.index,
            payload: {
              instance,
            }
          });
          return;
        }
      }
      return dispatch(this.retrieve(id, options));
    }
  }

  /**
   * Action to retrieve an instance of the Model
   * @param {number} id - instance id
   * @param {Object} options
   * @returns {Object} - the action
  **/
  retrieve(id, options={}) {
    return {
      type: REQUEST_RETRIEVE,
      index: this.index,
      payload: {
        Model: this._Model,
      },
      request: {
        url: this._urlScheme.getDetails(id, options),
      }
    }
  }

  /**
   * Get by parameters
   * @param {Object} options - the options of the list
   * @returns {Object} - the action dispatched
  **/
  list(options={}) {
    return (dispatch, getState) => {
      const state = this._getSubState(getState());
      dispatch({
        type: REQUEST_LIST,
        index: this.index,
        payload: {
          Model: this._Model,
          append: options.append,
        },
        request: {
          url: this._getListURL(state, options),
        }
      })
    }
  }

  /**
   * Update one instance
   * @param {number} id - the id
   * @param {Object} data - the data to update
   * @param {Object} options
   * @returns {Object} - the action
  **/
  updateOne(id, data={}, options={}){
    return {
      type: REQUEST_UPDATE_ONE,
      index: this.index,
      payload: {
        id: id && String(id),
        Model: this._Model,
      },
      request: {
        url: this._urlScheme.getDetails(id, options),
        method: options.partial ? 'PATCH' : 'PUT',
        data: data
      }
    }
  }

  /**
   * Update on list
   * @param {Object} data
   * @param {Object} options
   * @returns {Object} - the action
  **/
  update(data={}, options={}) {
    return {
      type: REQUEST_UPDATE,
      index: this.index,
      payload: {
        Model: this._Model
      },
      request: {
        url: this._urlScheme.getList(options),
        method: options.partial ? 'PATCH' : 'PUT',
        data: data
      }
    }
  }

  /**
   * Create a new instance
   * @param {Object} data
   * @param {Object} options
   * @returns {Object} - the action
  **/
  create(data, options= {}) {
    return {
      type: REQUEST_CREATE,
      index: this.index,
      request: {
        method: 'POST',
        url: this._urlScheme.getList(options),
        data,
      },
      payload: {
        Model: this._Model,
      }
    }
  }

  /**
   * Delete Action on the instance
   * @param {number} id
   * @param {Object} data
   * @param {Object} options
   * @returns {Object} the action
  **/
  delete(id, data={}, options={}){
    return {
      type: REQUEST_DELETE_ONE,
      index: this.index,
      payload: {
        id: id && String(id),
        Model: this._Model
      },
      request: {
        method: 'DELETE',
        url: this._urlScheme.getDetails(id, options),
        data: data
      }
    }
  }

  /**
   * Action Reset the Index
   * @returns {Object} the action
  **/
  reset() {
    return {
      type: RESET,
      index: this.index,
    }
  }

  /**
   * Action Reset the Current in the index
   * @returns {Object} the action
  **/
  resetCurrent() {
    return {
      type: RESET_CURRENT,
      index: this.index
    }
  }

  /**
   * get the index part of the state
  **/
  _getSubState(state) {
    return state[this.index] || {};
  }

  /**
   * get the number of values in index
  **/
  getTotalFromState(state) {
    return this._getSubState(state).total || 0;
  }

  /**
   * get values of index
  **/
  getValuesFromState(state) {
    return this._getSubState(state).values || [];
  }

  /**
   * get current of index
  **/
  getCurrentFromState(state) {
    return this._getSubState(state).current || null;
  }

  /**
   * get currentID of index
  **/
  getCurrentIDFromState(state) {
    return this._getSubState(state).currentID || null;
  }

  /**
   * get loading value of current action
   * @returns {Boolean}
  **/
  getCurrentLoadingFromState(state) {
    return this._getSubState(state).currentLoading || false;
  }

  /**
   * get empty boolean of index
   * @returns {Boolean}
  **/
  getEmptyFromState(state) {
    return this._getSubState(state).empty || false;
  }

  /**
   * get loading value of list action
   * @returns {Boolean}
  **/
  getLoadingFromState(state) {
    return this._getSubState(state).loading || false;
  }

  /**
   * get loading value of update action
   * @returns {Boolean}
  **/
  getUpdatingFromState(state) {
    return this._getSubState(state).updating || false;
  }

  /**
   * get loading value of delte action
   * @returns {Boolean}
  **/
  getDeletingFromState(state) {
    return this._getSubState(state).deleting || false;
  }

  getErrorFromState(state) {
    return this._getSubState(state).error || false;
  }
}
