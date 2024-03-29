import {BASE_URL, Actions} from '../../constants/constants';

const getIncomingRequestsRequest = () => ({
  type: Actions.GET_INCOMING_REQUESTS_REQUEST,
  isFetching: true
});

const getIncomingRequestsSuccess = requests => ({
  type: Actions.GET_INCOMING_REQUESTS_SUCCESS,
  isFetching: false,
  requests
});

const getIncomingRequestsFailure = err => ({
  type: Actions.GET_INCOMING_REQUESTS_FAILURE,
  isFetching: false,
  err
});

const updateStatusRequest = () => ({
  type: Actions.UPDATE_STATUS_REQUEST,
  isFetching: true
});

const updateStatusSuccess = requests => ({
  type: Actions.UPDATE_STATUS_SUCCESS,
  isFetching: false,
  requests
});

const updateStatusFailure = (err, requests) => ({
  type: Actions.UPDATE_STATUS_FAILURE,
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
export const updateStatus = ({userId, request, approved, oldRequests, status}) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, request, approved, token, status})
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(updateStatusRequest());

    return fetch(`${BASE_URL}/rent/request/auto_update_status`, config).then(res => res.json()).then(json => {
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
