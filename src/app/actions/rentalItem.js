import {
  BASE_URL, GET_RENTAL_ITEM_REQUEST, GET_RENTAL_ITEM_SUCCESS, GET_RENTAL_ITEM_FAILURE
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

/**
 * Get the rental rentalItem from the database
 */
export const getRentalItem = itemId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
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
