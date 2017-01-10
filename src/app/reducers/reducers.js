import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_SUCCESS, GET_USER_REQUEST,
  GET_USER_SUCCESS, GET_USER_FAILURE
} from '../actions/actions';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
function auth(state = {
  isFetching: false,
  // TODO: Better authentication check, and check to see if the token is expired
  isAuthenticated: Boolean(localStorage.getItem('token'))
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        err: action.message
      });
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        err: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        err: action.message
      });
    default:
      return state;
  }
}

export default combineReducers({
  auth,
  routing: routerReducer
});
