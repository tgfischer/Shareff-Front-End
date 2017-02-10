import {
  BASE_URL, GET_INCOMING_REQUESTS_REQUEST, GET_INCOMING_REQUESTS_SUCCESS, GET_INCOMING_REQUESTS_FAILURE,
  UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE
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

const updateStatusRequest = () => ({
  type: UPDATE_STATUS_REQUEST,
  isFetching: true
});

const updateStatusSuccess = requests => ({
  type: UPDATE_STATUS_SUCCESS,
  isFetching: false,
  requests
});

const updateStatusFailure = (err, requests) => ({
  type: UPDATE_STATUS_FAILURE,
  isFetching: false,
  requests,
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

/**
 * Update the status of the rent request
 */
export const updateStatus = ({userId, requestId, status, oldRequests}) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, requestId, status, token})
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(updateStatusRequest());

    return fetch(`${BASE_URL}/profile/incoming_requests/update_request_status`, config).then(res => res.json()).then(json => {
      // Get the user object
      const {requests, err} = json;

      if (requests) {
        // Dispatch the success action
        return dispatch(updateStatusSuccess(requests));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(updateStatusFailure(err, oldRequests));
    }).catch(err => {
      console.log(err);
      return dispatch(updateStatusFailure(err, oldRequests));
    });
  };
};
