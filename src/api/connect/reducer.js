import { REQUEST_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN, CLEAR } from "./actions";

const connect = (state={}, action) => {
  switch(action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        connect: action.connect
      }

    case REQUEST_LOGIN:
      return {
        ...state,
        connect: action.connect,
      }

    case ERROR_LOGIN:
      return {
        ...state,
        connect: action.connect,
      }

    case CLEAR:
      return {
        ...state,
        connect: action.connect,
      }

    default:
      return state;
  }
}

export default connect;
