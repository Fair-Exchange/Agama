import { GET_PIN_LIST } from '../actions/storeType';

export function Login(state = {
  pinList: [],
}, action) {
  if (state === null) state = { pinList: [] };

  switch (action.type) {
    case GET_PIN_LIST:
      return {
        ...state,
        pinList: action.pinList,
      };
    default:
      return state;
  }
}

export default Login;