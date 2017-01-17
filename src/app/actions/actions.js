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

/**
 * Actions for retreiving the user information from the database
 */
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

const loginRequest = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  message: undefined,
  user: undefined,
  creds
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  message: undefined,
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
  message: undefined,
  user: undefined,
  creds
});

const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  message: undefined,
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
  isAuthenticated: true,
  message: undefined,
  user: undefined
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false,
  message: undefined,
  user: undefined
});

const getUserRequest = token => ({
  type: GET_USER_REQUEST,
  isFetching: true,
  message: undefined,
  user: undefined,
  token
});

const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  isAuthenticated: true,
  isFetching: false,
  message: undefined,
  user
});

const getUserFailure = message => ({
  type: GET_USER_FAILURE,
  isAuthenticated: false,
  isFetching: false,
  message
});

/**
 * The base URL for the backend of the application
 */
const BASE_URL = '//localhost:4000';

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
    // Note the quotes for the templating
    body: `email=${info.email}&password=${info.password}`
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
