import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE,
  UPLOAD_PROFILE_PHOTO_REQUEST, UPLOAD_PROFILE_PHOTO_SUCCESS, UPLOAD_PROFILE_PHOTO_FAILURE,
  UPLOAD_ITEM_REQUEST, UPLOAD_ITEM_SUCCESS, UPLOAD_ITEM_FAILURE, GET_MY_ITEMS_REQUEST,
  GET_MY_ITEMS_SUCCESS, GET_MY_ITEMS_FAILURE
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

const uploadItemRequest = () => ({
  type: UPLOAD_ITEM_REQUEST,
  isFetching: true,
  err: undefined
});

const uploadItemSuccess = () => ({
  type: UPLOAD_ITEM_SUCCESS,
  isFetching: false,
  err: undefined
});

const uploadItemFailure = err => ({
  type: UPLOAD_ITEM_FAILURE,
  isFetching: false,
  err
});

const getMyItemsRequest = () => ({
  type: GET_MY_ITEMS_REQUEST,
  isFetching: true,
  err: undefined,
  myItems: undefined
});

const getMyItemsSuccess = myItems => ({
  type: GET_MY_ITEMS_SUCCESS,
  isFetching: false,
  err: undefined,
  myItems
});

const getMyItemsFailure = err => ({
  type: GET_MY_ITEMS_FAILURE,
  isFetching: false,
  myItems: undefined,
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

export const uploadItem = item => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  item.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  };

  return dispatch => {
    // kick off request to API
    dispatch(uploadItemRequest());

    return fetch(`${BASE_URL}/profile/upload_item/upload_item`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {err} = json;

      if (!err) {
        // Dispatch the success action
        return dispatch(uploadItemSuccess());
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(uploadItemFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadItemFailure(err));
    });
  };
};

export const getMyItems = ownerId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ownerId})
  };

  return dispatch => {
    // kick off request to API
    dispatch(getMyItemsRequest());

    return fetch(`${BASE_URL}/profile/my_items/my_items`, config).then(res => res.json()).then(json => {
      // Get the list of myItems information, and the error
      const {myItems, err} = json;

      if (!err) {
        // Dispatch the success action
        return dispatch(getMyItemsSuccess(myItems));
      }

      // if there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getMyItemsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getMyItemsFailure(err));
    });
  };
};
