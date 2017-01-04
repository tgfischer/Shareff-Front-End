/**
 * Actions for logging into the application
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * Actions for logging out of the application
 */
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token
});

const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
});

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
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('//localhost:4000/login', config).then(res => res.json()).then(json => {
      // Get the user object
      const {user, ok, err} = json;

      if (ok && user) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', user.token);

        // Dispatch the success action
        dispatch(loginSuccess(user));
      } else {
        // If there was a problem, we want to dispatch the error condition
        dispatch(loginError(err));
        return Promise.reject(err);
      }
    }).catch(err => {
      dispatch(loginError(err));
      console.log(err);
    });
  };
}

// Logs the user out
export const logout = () => {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
};
