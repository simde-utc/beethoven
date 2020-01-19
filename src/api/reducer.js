import {
  REQUEST_CREATE,
  REQUEST_RETRIEVE,
  REQUEST_LIST,
  REQUEST_UPDATE_ONE,
  REQUEST_UPDATE,
  REQUEST_DELETE_ONE,
  SET_CURRENT,
  SET_CURRENT_ID,
  RESET,
  RESET_CURRENT,
  REQUEST_ERROR,
} from "./types";

const mergeIndex = (oldIndex, instances) => {
  if(!instances.length) {
    return oldIndex;
  }

  return instances.reduce((index, value) => {
    index[value.getKey()] = value;
    return index;
  }, Object.assign({}, oldIndex))
}


const replaceIn = (values, instance) => {
  if(values) {
    const instanceIndex = values.findIndex((value) => value.getKey() === instance.getKey());
    if(instanceIndex !== -1) {
      values = values.slice();
      values.splice(instanceIndex, 1, instance)
    }
  }
}

const replaceInstance = (state, instance) => {
  const {index, values } = state;
  return {
    ...state,
    index: mergeIndex(index, [instance]),
    values: replaceIn(values, instance),
    current: instance,
  }
}

const reduceFunctions = {
  [SET_CURRENT_ID]: (state,  { payload }) => {
    const { id } = payload;
    const { current } = state;
    return {
      ...state,
      current: id && current && current.getKey() === id ? current : null,
      currentID: id
    };
  },

  [SET_CURRENT]: (state, { payload }) => {
    const { instance } = payload;
    const currentID = instance ? instance.getKey() : null;

    return {
      ...state,
      currentID,
      current: instance,
      index: instance ? mergeIndex(state.index, [instance]) : state.index,
    };
  },

  [REQUEST_RETRIEVE]: (state, { data, payload, success }) => {
    if(success == null) {
      return ({
        ...state,
        currentLoading: true,
      });
    }
    if(!success) {
      return ({
        ...state,
        currentLoading: false,
      })
    }

    const instance = new payload.Model(data);
    return {
      ...state,
      current: instance,
      currentLoading: false,
      index: mergeIndex(state.index, [instance]),
    };
  },

  [REQUEST_LIST]: (state, { data, abort, payload, response, success, request, error }) => {
    if(success == null) {
      if(state.abort) {
        state.abort();
      }
      return {
        ...state,
        abort,
        request,
        loading: true
      };
    }

    if(state.request !== request) {
      return state;
    }

    const nextState = {
      ...state,
      request: undefined,
      abort: undefined,
      loading: false,
    }

    if(!success) {
      return {
        ...nextState,
        error: response.getData(),
      }
    }

    let instances = null;
    if (Array.isArray(data)) {
      instances = data.map(value => new payload.Model(value));
    }
    else {
      instances = Object.entries(data).map(([_,value]) => new payload.Model(value))
    }
    const nextValues = (payload.append && state.values) ? state.values.concat(instances) : instances;

    return {
      ...nextState,
      empty: nextValues.length === 0,
      values: nextValues,
      index: mergeIndex(state.index, instances),
    }
  },

  [REQUEST_UPDATE_ONE]: (state, { data, payload, success, response, error }) => {
    if(success == null) {
      return {
        ...state,
        updating: true
      }
    }

    if(!success) {
      return {
        ...state,
        updating: false,
        error: response.getData()
      }
    }
    let instance = null;
    if(payload.forceUpdate) {
      instance = new payload.Model(payload.forceUpdate);
    }
    else {
      instance = new payload.Model(data);
    }
    return replaceInstance({
      ...state,
      updating: false
    }, instance)
  },

  [REQUEST_UPDATE]: (state, { data, payload, success, response, error}) => {
    if(success == null) {
      return {
        ...state,
        updating: true
      }
    }

    if(success === false) {

      return {
        ...state,
        updating: false,
        error: response.getData()
      }
    }

    const instance = new payload.Model(data);
    return replaceInstance({
      ...state,
      updating: false
    }, instance);
  },

  [REQUEST_CREATE] : (state, { data, payload, success, response, error }) => {
    if(success == null) {
      return {
        ...state,
        creating: true
      }
    }

    if(!success) {
      const err = new payload.Model(response.getData());
      return {
        ...state,
        creating: false,
        currentID: null,
        current: null,
        error: err
      }
    }
    const instance = new payload.Model(data);
    return {
      ...state,
      creating: false,
      currentID: instance.getKey(),
      current: instance,
      index: mergeIndex(state.index, [instance])
    };
  },

  [REQUEST_DELETE_ONE]: (state, { data, payload, success, response, error}) => {
    if(success==null) {
      return {
        ...state,
        deleting: true
      }
    }

    if(!success) {
      return {
        ...state,
        deleting: false,
        error: response.getData()
      }
    }

    const nextState = {
      ...state,
      request: undefined,
      abort: undefined,
      deleting: false,
    };

    const { id, Model } = payload;
    if(data && Model) {
      const instance = new Model(data);
      return replaceInstance(nextState, instance)
    }

    const current = (nextState.current && nextState.current.getKey() === id) ? null: nextState.current;
    const values  = nextState.values ? nextState.values.filter((value) => value.getKey() !== id) : [];
    const index = {...nextState.index};
    delete index[id];

    return {
      ...nextState,
      current,
      currentID: current ? nextState.currentID : null,
      index,
      values,
    }
  },

  [RESET_CURRENT] : (state) => {
    return {
      ...state,
      creating: false,
      updating: false,
      deleting: false,
      currentID: null,
      current: null,
      error: null,
    }
  },

  [RESET] : (state) => undefined,

  [REQUEST_ERROR]: (state, { payload }) => {
    return {
      ...state,
      error: new payload.Model(payload.data)
    }
  }
}

export default function apiReducer(state, action) {
  const {type, index} = action;
  const reduceFunction = reduceFunctions[type];

  if(!reduceFunction) {
    return state;
  }

  const currentState = (state && state[index]) || {};
  const nextState = reduceFunction(currentState, action);
  if(currentState === nextState) {
    return state;
  }

  return {
    ...state,
    [index]: nextState
  }
}
