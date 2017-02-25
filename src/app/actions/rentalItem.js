import {BASE_URL, Actions} from '../constants/constants';

const getRentalItemRequest = () => ({
  type: Actions.GET_RENTAL_ITEM_REQUEST,
  isFetching: true
});

const getRentalItemSuccess = rentalItem => ({
  type: Actions.GET_RENTAL_ITEM_SUCCESS,
  isFetching: false,
  rentalItem
});

const getRentalItemFailure = err => ({
  type: Actions.GET_RENTAL_ITEM_FAILURE,
  isFetching: false,
  err
});

const makeRentRequestRequest = () => ({
  type: Actions.MAKE_RENT_REQUEST_REQUEST,
  isFetching: true
});

const makeRentRequestSuccess = () => ({
  type: Actions.MAKE_RENT_REQUEST_SUCCESS,
  isFetching: false
});

const makeRentRequestFailure = err => ({
  type: Actions.MAKE_RENT_REQUEST_FAILURE,
  isFetching: false,
  err
});

const removeMyItemRequest = () => ({
  type: Actions.REMOVE_MY_ITEM_REQUEST,
  isFetching: true
});

const removeMyItemSuccess = () => ({
  type: Actions.REMOVE_MY_ITEM_SUCCESS,
  isFetching: false
});

const removeMyItemFailure = err => ({
  type: Actions.REMOVE_MY_ITEM_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the rentalItem from the database
 */
export const getRentalItem = itemId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `itemId=${itemId}`
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getRentalItemRequest());

    return fetch(`${BASE_URL}/listings/get_rental_item`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {rentalItem, err} = json;

      if (rentalItem) {
        // Dispatch the success action
        return dispatch(getRentalItemSuccess(rentalItem));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(getRentalItemFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getRentalItemFailure(err));
    });
  };
};

/**
 * Get the rental rentalItem from the database
 */
export const makeRentRequest = body => {
  body.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Note the quotes for the templating
    body: JSON.stringify(body)
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(makeRentRequestRequest());

    return fetch(`${BASE_URL}/rent/request`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        return dispatch(makeRentRequestFailure(err));
      }

      // Dispatch the success action
      return dispatch(makeRentRequestSuccess());
    }).catch(err => {
      console.log(err);
      return dispatch(makeRentRequestFailure(err));
    });
  };
};

/**
 * Remove the rental rentalItem from the database
 */
export const removeMyItem = body => {
  body.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Note the quotes for the templating
    body: JSON.stringify(body)
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(removeMyItemRequest());

    return fetch(`${BASE_URL}/profile/my_items/remove_my_item`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        return dispatch(removeMyItemFailure(err));
      }

      // Dispatch the success action
      return dispatch(removeMyItemSuccess);
    }).catch(err => {
      console.log(err);
      return dispatch(removeMyItemFailure(err));
    });
  };
};
