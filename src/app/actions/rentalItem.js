import {
  BASE_URL, GET_RENTAL_ITEM_REQUEST, GET_RENTAL_ITEM_SUCCESS, GET_RENTAL_ITEM_FAILURE,
  MAKE_RENT_REQUEST_REQUEST, MAKE_RENT_REQUEST_SUCCESS, MAKE_RENT_REQUEST_FAILURE
} from '../constants/constants';

const getRentalItemRequest = () => ({
  type: GET_RENTAL_ITEM_REQUEST,
  isFetching: true,
  err: undefined,
  rentalItem: undefined
});

const getRentalItemSuccess = rentalItem => ({
  type: GET_RENTAL_ITEM_SUCCESS,
  isFetching: false,
  err: undefined,
  rentalItem
});

const getRentalItemFailure = err => ({
  type: GET_RENTAL_ITEM_FAILURE,
  isFetching: false,
  rentalItem: undefined,
  err
});

const makeRentRequestRequest = () => ({
  type: MAKE_RENT_REQUEST_REQUEST,
  isFetching: true,
  err: undefined
});

const makeRentRequestSuccess = () => ({
  type: MAKE_RENT_REQUEST_SUCCESS,
  isFetching: false,
  err: undefined
});

const makeRentRequestFailure = err => ({
  type: MAKE_RENT_REQUEST_FAILURE,
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
