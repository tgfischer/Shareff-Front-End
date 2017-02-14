import {BASE_URL, Actions} from '../../constants/constants';

const getMyItemsRequest = () => ({
  type: Actions.GET_MY_ITEMS_REQUEST,
  isFetching: true
});

const getMyItemsSuccess = myItems => ({
  type: Actions.GET_MY_ITEMS_SUCCESS,
  isFetching: false,
  myItems
});

const getMyItemsFailure = err => ({
  type: Actions.GET_MY_ITEMS_FAILURE,
  isFetching: false,
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
