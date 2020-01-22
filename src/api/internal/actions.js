export const REQUEST_INSERT = Symbol('INTERNAL.REQUEST_INSERT');
export const REQUEST_DELETE = Symbol('INTERNAL.REQUEST_DELETE');
export const CLEAR =  Symbol('INTERNAL.CLEAR');

export function insertData(key, data) {
  return {
    type: REQUEST_INSERT,
    payload: {
      key,
      data,
    }
  }
}

export function deleteData(key) {
  return {
    type: REQUEST_DELETE,
    payload: {
      key,
    }
  }
}

export function clear() {
  return {
    type: CLEAR,
  }
}

export function getData(state = {}, key) {
  return state.internal ? state.internal[key] : null;
}
