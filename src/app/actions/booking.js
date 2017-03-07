import {BASE_URL, Actions} from '../constants/constants';

const getBookingRequest = () => ({
  type: Actions.GET_BOOKING_REQUEST,
  isFetching: true
});

const getBookingSuccess = bookingInfo => ({
  type: Actions.GET_BOOKING_SUCCESS,
  isFetching: false,
  bookingInfo
});

const getBookingFailure = err => ({
  type: Actions.GET_BOOKING_FAILURE,
  isFetching: false,
  err
});

const createUserReviewRequest = () => ({
  type: Actions.CREATE_USER_REVIEW_REQUEST,
  isFetching: true
});

const createUserReviewSuccess = bookingInfo => ({
  type: Actions.CREATE_USER_REVIEW_SUCCESS,
  isFetching: false,
  bookingInfo
});

const createUserReviewFailure = err => ({
  type: Actions.CREATE_USER_REVIEW_FAILURE,
  isFetching: false,
  err
});

const confirmItemRequest = () => ({
  type: Actions.CONFIRM_ITEM_REQUEST,
  isFetching: true
});

const confirmItemSuccess = bookingInfo => ({
  type: Actions.CONFIRM_ITEM_SUCCESS,
  isFetching: false,
  bookingInfo
});

const confirmItemFailure = err => ({
  type: Actions.CONFIRM_ITEM_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the booking from the database
 */
export const getBooking = bookingId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `bookingId=${bookingId}`
  };

  return dispatch => {
    // We dispatch getBookingRequest to kickoff the call to the API
    dispatch(getBookingRequest());

    return fetch(`${BASE_URL}/booking/get_booking_info`, config).then(res => res.json()).then(json => {
      // Get the booking object
      const {bookingInfo, err} = json;
      if (bookingInfo) {
        // Dispatch the success action
        return dispatch(getBookingSuccess(bookingInfo));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(getBookingFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getBookingFailure(err));
    });
  };
};

/**
 * The current user is rating the other user from this booking.
 */
export const createUserReview = body => {
  body.token = localStorage.getItem('token'); // necessary?

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  return dispatch => {
    dispatch(createUserReviewRequest());

    return fetch(`${BASE_URL}/booking/submit_review`, config).then(res => res.json()).then(json => {
      const {bookingInfo, err} = json;

      if (bookingInfo) {
        return dispatch(createUserReviewSuccess(bookingInfo));
      }

      // Dispatch the success action
      return dispatch(createUserReviewFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(createUserReviewFailure(err));
    });
  };
};

/**
 * The current user is submitting their confirmation/rejection for the booking.
 * It could be owner or renter, start or end - this is determined on the server.
 */
export const confirmItem = body => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  return dispatch => {
    dispatch(confirmItemRequest());

    return fetch(`${BASE_URL}/booking/submit_confirmation`, config).then(res => res.json()).then(json => {
      const {bookingInfo, err} = json;

      if (bookingInfo) {
        return dispatch(confirmItemSuccess(bookingInfo));
      }

      return dispatch(confirmItemFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(confirmItemFailure(err));
    });
  };
};
