import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE
} from '../constants/constants';

const getPersonalInfoRequest = user => ({
  type: GET_PERSONAL_INFO_REQUEST,
  isFetching: true,
  err: undefined,
  user
});

const getPersonalInfoSuccess = user => ({
  type: GET_PERSONAL_INFO_SUCCESS,
  isFetching: false,
  success: true,
  err: undefined,
  user
});

const getPersonalInfoFailure = err => ({
  type: GET_PERSONAL_INFO_FAILURE,
  isFetching: false,
  success: false,
  err
});

/**
 * Get the user's personal information from the database
 */
export const getPersonalInfo = user => {
  // Send the token as well so that we can validate that the user that is logged
  // is only modifying their own data
  user.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Note the quotes for the templating
    body: JSON.stringify(user)
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(getPersonalInfoRequest(user));

    return fetch(`${BASE_URL}/profile/personal_info`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {success, err} = json;

      if (success) {
        // Dispatch the success action
        return dispatch(getPersonalInfoSuccess(user));
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getPersonalInfoFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getPersonalInfoFailure(err));
    });
  };
};
