import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE,
  GET_LISTINGS_REQUEST, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE
} from '../constants/constants';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
export const reducers = (state = {
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
    case GET_PERSONAL_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined,
        success: undefined,
        user: action.user
      });
    case GET_PERSONAL_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        user: action.user,
        success: action.success
      });
    case GET_PERSONAL_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        success: undefined,
        err: action.err
      });
    case GET_LISTINGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        listings: undefined,
        err: undefined
      });
    case GET_LISTINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        listings: action.listings
      });
    case GET_LISTINGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        listings: undefined,
        err: action.message
      });
    default:
      return state;
  }
};
