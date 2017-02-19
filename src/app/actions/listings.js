import {BASE_URL, Actions} from '../constants/constants';

const getListingsRequest = request => ({
  type: Actions.GET_LISTINGS_REQUEST,
  isFetching: true,
  request
});

const getListingsSuccess = listings => ({
  type: Actions.GET_LISTINGS_SUCCESS,
  isFetching: false,
  listings
});

const getListingsFailure = message => ({
  type: Actions.GET_LISTINGS_FAILURE,
  isFetching: false,
  message
});

/**
 * Get the rental listings from the database
 */
export const getListings = request => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Note the quotes for the templating
    body: JSON.stringify(request)
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getListingsRequest());

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
