import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE
} from '../constants/constants';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
export const auth = (state = {
  isFetching: false,
  isAuthenticated: Boolean(localStorage.getItem('token'))
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        message: undefined,
        user: action.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.message
      });
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        err: undefined,
        user: action.user
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.message
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        user: undefined,
        err: undefined
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        err: undefined,
        user: action.user
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.message
      });
    default:
      return state;
  }
};
