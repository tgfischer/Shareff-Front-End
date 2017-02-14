import {BASE_URL, Actions} from '../../constants/constants';

const getPersonalInfoRequest = () => ({
  type: Actions.GET_PERSONAL_INFO_REQUEST,
  isFetching: true
});

const getPersonalInfoSuccess = user => ({
  type: Actions.GET_PERSONAL_INFO_SUCCESS,
  isFetching: false,
  success: true,
  user
});

const getPersonalInfoFailure = err => ({
  type: Actions.GET_PERSONAL_INFO_FAILURE,
  isFetching: false,
  success: false,
  err
});

const uploadProfilePhotoRequest = () => ({
  type: Actions.UPLOAD_PROFILE_PHOTO_REQUEST,
  isFetching: true
});

const uploadProfilePhotoSuccess = user => ({
  type: Actions.UPLOAD_PROFILE_PHOTO_SUCCESS,
  isFetching: false,
  user
});

const uploadProfilePhotoFailure = err => ({
  type: Actions.UPLOAD_PROFILE_PHOTO_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the user's personal information from the database
 */
export const getPersonalInfo = user => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  user.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(getPersonalInfoRequest());

    return fetch(`${BASE_URL}/profile/personal_info/get_personal_info`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(getPersonalInfoFailure(err));
      }

      // Dispatch the success action
      return dispatch(getPersonalInfoSuccess(user));
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

    return fetch(`${BASE_URL}/profile/personal_info/upload_profile_photo`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(uploadProfilePhotoFailure(err));
      }

      // Dispatch the success action
      return dispatch(uploadProfilePhotoSuccess(user));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadProfilePhotoFailure(err));
    });
  };
};
