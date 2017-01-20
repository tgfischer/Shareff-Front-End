import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE
} from '../constants/constants';
import {bodyBuilder} from '../utils/Utils';

const getPersonalInfoRequest = info => ({
  type: GET_PERSONAL_INFO_REQUEST,
  isFetching: true,
  err: undefined,
  info
});

const getPersonalInfoSuccess = () => ({
  type: GET_PERSONAL_INFO_SUCCESS,
  isFetching: false,
  success: true,
  err: undefined
});

const getPersonalInfoFailure = err => ({
  type: GET_PERSONAL_INFO_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the user's personal information from the database
 */
export const getPersonalInfo = info => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
    body: bodyBuilder(info)
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(getPersonalInfoRequest(info));

    return fetch(`${BASE_URL}/profile/personal_info`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {success, err} = json;

      if (success) {
        // Dispatch the success action
        return dispatch(getPersonalInfoSuccess());
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
