import { BaseModel } from "./utils";
import { URLScheme } from "./urls";

import {
  REQUEST_CREATE,
  REQUEST_RETRIEVE,
  REQUEST_LIST,
  REQUEST_UPDATE_ONE,
  SET_CURRENT,
  SET_CURRENT_ID,
  RESET_CURRENT,
  REQUEST_ERROR
} from "./types";


/**
 * API Endpoint for Weezevent APIs
 * Hace to pass differents parameters such as
 * - system_id
 * - fun_id
 * - app_key
**/

export default class WeezAPIEndpoint {
  /**
   * WeezAPIEndpoint(url, options)
   * WeezAPIEndpoint(url, Model, options)
  */
  constructor(urlScheme, Model = BaseModel, options={}) {
    if(Model && typeof Model !== 'function') {
      options = Model;
      Model = BaseModel;
    }

    this._urlScheme = URLScheme.fromString(urlScheme);

    const name = options.name || (Model === BaseModel ? '_' : Model.name);
    this._Model = Model;
    this.index = options.index || Symbol(`${name}.INDEX`);

    delete options.name;

    this._data = options.data || {};
    this._parameters = options.parameters || {};
    this._options = options;
  }

  _getListURL(options = {}) {
    if(options.url) {
      const url = URLScheme.fromString(options.url);
      delete options[url];
      return url.getList(options, {
        ...this._parameters,
        ...options.parameters
      })
    }

    return this._urlScheme.getList(options, {
      ...this._parameters,
      ...options.parameters
    });
  }

  _getDetailsURL(id, options = {}) {
    if(options.url) {
      const url = URLScheme.fromString(options.url);
      delete options[url];
      return url.getDetails(id, options, {
        ...this._parameters,
        ...options.parameters
      })
    }

    return this._urlScheme.getDetails(id, options, {
      ...this._parameters,
      ...options.parameters
    });
  }

  /**
   * get the index part of the state
  **/
  _getSubState(state) {
    return state[this.index] || {};
  }

  /**
   * Set the instance pointed by the ID to be the current instance
   * @param {number} id - the id
   * @param {Object} options - options for the url generation
   * @return {Object} - the dispatched action
  **/
  setCurrent(id = null, options={}) {
    id = id && String(id)
    return (dispatch, getState) => {
      const state = this._getSubState(getState());
      const recycle = Boolean(!options.update);

      if(state.curentID === id && recycle) {
        return;
      }

      dispatch({
        type: SET_CURRENT_ID,
        index: this.index,
        payload: {
          id,
        }
      });

      if(recycle) {
        const index = state.index || {};
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
  retrieve(id=null, options={}) {
    return {
      type: REQUEST_RETRIEVE,
      index: this.index,
      payload: {
        Model: this._Model,
      },
      request: {
        url : id ? this._getDetailsURL(id, options) : this._getListURL(options),
        credentials: this._options.credentials,
      }
    }
  }

  /**
   * Get by parameters
   * @param {Object} options - the options of the list
   * @returns {Object} - the action
  **/
  list(options={}) {
    return {
      type: REQUEST_LIST,
      index: this.index,
      payload: {
        Model: this._Model,
        append: options.append,
      },
      request: {
        url: this._getListURL(options),
        method: this._options.method || 'GET',
        data: this._data,
        credentials: this._options.credentials,
      }
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

  create(data, options={}) {
    return {
      type: REQUEST_CREATE,
      index: this.index,
      payload: {
        Model: this._Model,
      },
      request: {
        method: this._options.method || 'POST',
        url: this._getListURL(options),
        data: {...this._data, ...data },
        credentials: this._options.credentials,
      }
    }
  }

  updateOne(id = null, data={}, options={}) {
    return {
      type: REQUEST_UPDATE_ONE,
      index: this.index,
      payload: {
        id: id && String(id),
        Model: this._Model,
        forceUpdate: options.forceUpdate || null,
      },
      request: {
        url: id ? this._getDetailsURL(id, options) : this._getListURL(options),
        method: this._options.method || 'PUT',
        data: {...this._data, ...data},
        credentials: this._options.credentials,
      }
    }
  }

  error(data={}, options={}) {
    return {
      type: REQUEST_ERROR,
      index: this.index,
      payload: {
        Model: this._Model,
        data,
      }
    }
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
   * get the error in the state
  **/
  getErrorFromState(state) {
    return this._getSubState(state).error || null;
  }

  /**
   * get creating boolean in the state
  **/
  getCreatingFromState(state) {
    return this._getSubState(state).creating || false;
  }
}
