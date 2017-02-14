import {BASE_URL, Actions} from '../constants/constants';
import {bodyBuilder} from '../utils/Utils';

const loginRequest = creds => ({
  type: Actions.LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const loginSuccess = user => ({
  type: Actions.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  user
});

const loginFailure = err => ({
  type: Actions.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  err
});

const signupRequest = creds => ({
  type: Actions.SIGNUP_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const signupSuccess = user => ({
  type: Actions.SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  user
});

const signupFailure = err => ({
  type: Actions.SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  err
});

const logoutRequest = () => ({
  type: Actions.LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
});

const logoutSuccess = () => ({
  type: Actions.LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
});

const getUserRequest = token => ({
  type: Actions.GET_USER_REQUEST,
  isFetching: true,
  token
});

const getUserSuccess = user => ({
  type: Actions.GET_USER_SUCCESS,
  isAuthenticated: true,
  isFetching: false,
  user
});

const getUserFailure = err => ({
  type: Actions.GET_USER_FAILURE,
  isAuthenticated: false,
  isFetching: false,
  err
});

/**
 * Log the user into their account
 */
export const login = creds => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
    body: `email=${creds.email}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(loginRequest(creds));

    return fetch(`${BASE_URL}/login`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {user, err} = json;

      if (user && user.token) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', user.token);

        // Dispatch the success action
        return dispatch(loginSuccess(user));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(loginFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(loginFailure(err));
    });
  };
};

/**
 * Sign the user up for a new account using the information they submitted in the
 * form
 */
export const signup = info => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyBuilder(info)
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(signupRequest(info));

    return fetch(`${BASE_URL}/signup`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {user, err} = json;

      if (user && user.token) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', user.token);

        // Dispatch the success action
        return dispatch(signupSuccess(user));
      }
      // If there was a problem, we want to dispatch the error condition
      return dispatch(signupFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(signupFailure(err));
    });
  };
};

/**
 * Log the user out
 */
export const logOut = () => {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    return dispatch(logoutSuccess());
  };
};

/**
 * Get the user from the JSON Web Token
 */
export const getUser = token => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
    body: `token=${token}`
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getUserRequest(token));

    return fetch(`${BASE_URL}/get_user`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {user, err} = json;

      if (user) {
        // Dispatch the success action
        return dispatch(getUserSuccess(user));
      }
      // If there was a problem, we want to dispatch the error condition
      dispatch(getUserFailure(err));

      // Log the user out
      return logOut();
    }).catch(err => {
      console.log(err);
      dispatch(getUserFailure(err));

      // Log the user out
      return logOut();
    });
  };
};
