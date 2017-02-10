import {
  BASE_URL, GET_MY_ITEMS_REQUEST, GET_MY_ITEMS_SUCCESS, GET_MY_ITEMS_FAILURE
} from '../../constants/constants';

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
 * Fetch the list of items that the user has put up for rent
 */
export const getMyItems = owner => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  owner.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(owner)
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
