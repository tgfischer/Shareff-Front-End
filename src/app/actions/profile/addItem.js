import {
  BASE_URL, UPLOAD_ITEM_REQUEST, UPLOAD_ITEM_SUCCESS, UPLOAD_ITEM_FAILURE
} from '../../constants/constants';

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
