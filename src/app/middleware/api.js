const BASE_URL = 'http://localhost:4000/';

const callApi = (endpoint, authenticated) => {
  const token = localStorage.getItem('token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: {Authorization: 'Bearer ${token}'}
      };
    } else {
      throw new Error("No token saved!");
    }
  }

  return fetch(BASE_URL + endpoint, config).then(res =>
    res.text().then(text => ({text, res}))
  ).then(({text, res}) => {
    if (res.ok) {
      return text;
    }

    return Promise.reject(text);
  }).catch(err => console.log(err));
};

export const CALL_API = Symbol('Call API');

// TODO: Figure out a way to do this without disabling ESLint
// eslint-disable-next-line no-unused-vars
export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {endpoint, types, authenticated} = callAPI;
  const [successType, errorType] = types;

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  );
};
