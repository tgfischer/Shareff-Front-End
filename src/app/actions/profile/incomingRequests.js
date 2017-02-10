import {
  BASE_URL, GET_INCOMING_REQUESTS_REQUEST, GET_INCOMING_REQUESTS_SUCCESS, GET_INCOMING_REQUESTS_FAILURE
} from '../../constants/constants';

const getIncomingRequestsRequest = () => ({
  type: GET_INCOMING_REQUESTS_REQUEST,
  isFetching: true
});

const getIncomingRequestsSuccess = requests => ({
  type: GET_INCOMING_REQUESTS_SUCCESS,
  isFetching: false,
  requests
});

const getIncomingRequestsFailure = err => ({
  type: GET_INCOMING_REQUESTS_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the rent requests from the database
 */
export const getIncomingRequests = ({userId}) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, token})
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(getIncomingRequestsRequest());

    return fetch(`${BASE_URL}/profile/incoming_requests/get_incoming_requests`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {requests, err} = json;

      if (requests) {
        // Dispatch the success action
        return dispatch(getIncomingRequestsSuccess(requests));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(getIncomingRequestsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getIncomingRequestsFailure(err));
    });
  };
};
