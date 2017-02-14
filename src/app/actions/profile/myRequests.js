import {BASE_URL, Actions} from '../../constants/constants';

const getMyRequestsRequest = () => ({
  type: Actions.GET_MY_REQUESTS_REQUEST,
  isFetching: true
});

const getMyRequestsSuccess = myRequests => ({
  type: Actions.GET_MY_REQUESTS_SUCCESS,
  isFetching: false,
  myRequests
});

const getMyRequestsFailure = err => ({
  type: Actions.GET_MY_REQUESTS_FAILURE,
  isFetching: false,
  err
});

const cancelRequestRequest = () => ({
  type: Actions.CANCEL_REQUEST_REQUEST,
  isFetching: true
});

const cancelRequestSuccess = myRequests => ({
  type: Actions.CANCEL_REQUEST_SUCCESS,
  isFetching: false,
  myRequests
});

const cancelRequestFailure = err => ({
  type: Actions.CANCEL_REQUEST_FAILURE,
  isFetching: false,
  err
});

/**
 * Fetch the list of requests that the user has sent
 */
export const getMyRequests = ({userId}) => {
  const token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, token})
  };

  return dispatch => {
    // kick off request to API
    dispatch(getMyRequestsRequest());

    return fetch(`${BASE_URL}/profile/my_requests/get_my_requests`, config).then(res => res.json()).then(({myRequests, err}) => {
      if (!err) {
        // Dispatch the success action
        return dispatch(getMyRequestsSuccess(myRequests));
      }

      // if there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getMyRequestsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getMyRequestsFailure(err));
    });
  };
};

/**
 * Cancel a particular rent request
 */
export const cancelRequest = ({userId, requestId}) => {
  const token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({requestId, userId, token})
  };

  return dispatch => {
    // kick off request to API
    dispatch(cancelRequestRequest());

    return fetch(`${BASE_URL}/profile/my_requests/cancel_request`, config).then(res => res.json()).then(({myRequests, err}) => {
      if (!err) {
        // Dispatch the success action
        return dispatch(cancelRequestSuccess(myRequests));
      }

      // if there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(cancelRequestFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(cancelRequestFailure(err));
    });
  };
};
