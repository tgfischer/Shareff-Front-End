import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE,
  UPLOAD_PROFILE_PHOTO_REQUEST, UPLOAD_PROFILE_PHOTO_SUCCESS, UPLOAD_PROFILE_PHOTO_FAILURE
} from '../constants/constants';

const getPersonalInfoRequest = () => ({
  type: GET_PERSONAL_INFO_REQUEST,
  isFetching: true,
  err: undefined
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

const uploadProfilePhotoRequest = () => ({
  type: UPLOAD_PROFILE_PHOTO_REQUEST,
  isFetching: true,
  err: undefined
});

const uploadProfilePhotoSuccess = user => ({
  type: UPLOAD_PROFILE_PHOTO_SUCCESS,
  isFetching: false,
  err: undefined,
  user
});

const uploadProfilePhotoFailure = err => ({
  type: UPLOAD_PROFILE_PHOTO_FAILURE,
  isFetching: false,
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
    dispatch(getPersonalInfoRequest());

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

/**
 * Get the user's personal information from the database
 */
export const uploadProfilePhoto = formData => {
  const config = {
    method: 'POST',
    body: formData
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(uploadProfilePhotoRequest());

    return fetch(`${BASE_URL}/profile/upload_profile_photo`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (user) {
        // Dispatch the success action
        return dispatch(uploadProfilePhotoSuccess(user));
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(uploadProfilePhotoFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadProfilePhotoFailure(err));
    });
  };
};
