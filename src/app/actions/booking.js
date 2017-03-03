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
