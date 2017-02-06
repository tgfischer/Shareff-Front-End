import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE,
  UPLOAD_PHOTOS_REQUEST, UPLOAD_PHOTOS_SUCCESS, UPLOAD_PHOTOS_FAILURE,
  ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE, GET_MY_ITEMS_REQUEST,
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

const uploadPhotosRequest = () => ({
  type: UPLOAD_PHOTOS_REQUEST,
  isFetching: true,
  err: undefined
});

const uploadPhotosSuccess = json => ({
  type: UPLOAD_PHOTOS_SUCCESS,
  isFetching: false,
  err: undefined,
  user: json.user,
  photoUrls: json.photoUrls
});

const uploadPhotosFailure = json => ({
  type: UPLOAD_PHOTOS_FAILURE,
  isFetching: false,
  err: json.err
});

const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST,
  isFetching: true,
  err: undefined
});

const addItemSuccess = () => ({
  type: ADD_ITEM_SUCCESS,
  isFetching: false,
  err: undefined
});

const addItemFailure = err => ({
  type: ADD_ITEM_FAILURE,
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
      const {err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(uploadPhotosFailure(err));
      }

      // Dispatch the success action
      return dispatch(uploadPhotosSuccess(json));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadPhotosFailure(err));
    });
  };
};

export const addItem = item => {
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
    dispatch(addItemRequest());

    return fetch(`${BASE_URL}/profile/upload_item/upload_item`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {err} = json;

      if (!err) {
        // Dispatch the success action
        return dispatch(addItemSuccess());
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(addItemFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(addItemFailure(err));
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
