import {BASE_URL, Actions} from '../constants/constants';

const getUserRequest = () => ({
  type: Actions.GET_USER_REQUEST,
  isFetching: true
});

const getUserSuccess = user => ({
  type: Actions.GET_USER_SUCCESS,
  isFetching: false,
  user
});

const getUserFailure = err => ({
  type: Actions.GET_USER_FAILURE,
  isFetching: false,
  err
});

export const getUser = userId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId})
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getUserRequest());

    return fetch(`${BASE_URL}/get_user_2`, config).then(res => res.json()).then(({err, user}) => {
      if (err) {
        // If there was a problem, we want to dispatch the error condition
        return dispatch(getUserFailure(err));
      }

      // Dispatch the success action
      return dispatch(getUserSuccess(user));
    }).catch(err => {
      console.log(err);
      return dispatch(getUserFailure(err));
    });
  };
};
