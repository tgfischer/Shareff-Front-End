/**
 * Actions for logging into the application
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * Actions for signing up for the application
 */
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

/**
 * Actions for logging out of the application
 */
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const loginRequest = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
  user
});

const loginFailure = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

const signupRequest = creds => ({
  type: SIGNUP_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
  user
});

const signupFailure = message => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
});

/*
const logoutFailure = message => ({
  type: LOGOUT_FAILURE,
  isFetching: false,
  isAuthenticated: true,
  message
});
*/

// The base URL for the server
const BASE_URL = '//localhost:4000';

// Calls the API to get a token and dispatches actions along the way
export function login(creds) {
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

      if (user) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', user.token);

        // Dispatch the success action
        dispatch(loginSuccess(user));
      } else {
        // If there was a problem, we want to dispatch the error condition
        dispatch(loginFailure(err));
        return Promise.reject(err);
      }
    }).catch(err => {
      dispatch(loginFailure(err));
      console.log(err);
    });
  };
}

// Calls the API to get a token and dispatches actions along the way
export function signup(info) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
    body: `email=${info.email}&password=${info.password}`
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(signupRequest(info));

    return fetch(`${BASE_URL}/signup`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {user, err} = json;

      if (user) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', user.token);

        // Dispatch the success action
        dispatch(signupSuccess(user));
      } else {
        // If there was a problem, we want to dispatch the error condition
        dispatch(signupFailure(err));
        return Promise.reject(err);
      }
    }).catch(err => {
      dispatch(signupFailure(err));
      console.log(err);
    });
  };
}

// Logs the user out
export const logout = () => {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
};
