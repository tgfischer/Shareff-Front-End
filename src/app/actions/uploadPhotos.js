import {BASE_URL, Actions} from '../constants/constants';

const uploadPhotosRequest = () => ({
  type: Actions.UPLOAD_PHOTOS_REQUEST,
  isFetching: true
});

const uploadPhotosSuccess = (user, photoUrls) => ({
  type: Actions.UPLOAD_PHOTOS_SUCCESS,
  isFetching: false,
  user,
  photoUrls
});

const uploadPhotosFailure = err => ({
  type: Actions.UPLOAD_PHOTOS_FAILURE,
  isFetching: false,
  err
});

/**
 * Upload photos to proper route
 */
export const uploadPhotos = formData => {
  const config = {
    method: 'POST',
    body: formData
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(uploadPhotosRequest());

    const REQUEST_URL = formData.get('isProfilePhoto') === 'true' ? 'upload_profile_photo' : 'upload_item_photos';

    return fetch(`${BASE_URL}/profile/personal_info/${REQUEST_URL}`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, photoUrls, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(uploadPhotosFailure(err));
      }

      // Dispatch the success action
      return dispatch(uploadPhotosSuccess(user, photoUrls));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadPhotosFailure(err));
    });
  };
};
