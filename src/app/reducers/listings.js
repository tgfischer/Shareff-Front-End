import {
  GET_LISTINGS_REQUEST, GET_LISTINGS_SUCCESS, GET_LISTINGS_FAILURE
} from '../constants/constants';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
export const listings = (state = {
  isFetching: false
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        listings: undefined,
        err: undefined
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        listings: action.listings
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        listings: undefined,
        err: action.message
      });
    default:
      return state;
  }
};
