import {BASE_URL, Actions} from '../../constants/constants';

const addItemRequest = () => ({
  type: Actions.UPLOAD_ITEM_REQUEST,
  isFetching: true
});

const addItemSuccess = () => ({
  type: Actions.UPLOAD_ITEM_SUCCESS,
  isFetching: false
});

const addItemFailure = err => ({
  type: Actions.UPLOAD_ITEM_FAILURE,
  isFetching: false,
  err
});

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
