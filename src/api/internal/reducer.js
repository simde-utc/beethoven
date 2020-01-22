import { REQUEST_INSERT, REQUEST_DELETE, CLEAR } from "./actions";

const connect = (state={}, action) => {
  const {type, payload} = action;
  switch(type) {
    case REQUEST_INSERT:
      const internal = state.internal || {};
      return {
        ...state,
        internal: {
          ...internal,
          [payload.key]: payload.data,
        }
      }

    case REQUEST_DELETE:
      const newState = {...state};
      if(newState.internal) {
        delete newState['internal'][payload.key]
      }
      return newState;

    case CLEAR:
      return {
        ...state,
        connect: {},
      }

    default:
      return state;
  }
}

export default connect;
