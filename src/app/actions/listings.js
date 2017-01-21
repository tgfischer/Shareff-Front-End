import {
  BASE_URL, GET_LISTINGS_REQUEST, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE
} from '../constants/constants';

const getListingsRequest = request => ({
  type: GET_LISTINGS_REQUEST,
  isFetching: true,
  message: undefined,
  listings: undefined,
  request
});

const getListingsSuccess = listings => ({
  type: GET_LISTINGS_SUCCESS,
  isFetching: false,
  message: undefined,
  request: undefined,
  listings
});

const getListingsFailure = message => ({
  type: GET_LISTINGS_FAILURE,
  isFetching: false,
  listings: undefined,
  request: undefined,
  message
});

/**
 * Get the rental listings from the database
 */
export const getListings = request => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // Note the quotes for the templating
    body: `q=${request.q}&startDate=${request.startDate}&endDate=${request.endDate}&location=${request.location}`
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getListingsRequest);

    return fetch(`${BASE_URL}/listings`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {listings, err} = json;

      if (listings) {
        // Dispatch the success action
        return dispatch(getListingsSuccess(listings));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(getListingsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getListingsFailure(err));
    });
  };
};
