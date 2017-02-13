import {
  BASE_URL, GET_MY_REQUESTS_REQUEST, GET_MY_REQUESTS_SUCCESS, GET_MY_REQUESTS_FAILURE
} from '../../constants/constants';

const getMyRequestsRequest = () => ({
  type: GET_MY_REQUESTS_REQUEST,
  isFetching: true
});

const getMyRequestsSuccess = myRequests => ({
  type: GET_MY_REQUESTS_SUCCESS,
  isFetching: false,
  myRequests
});

const getMyRequestsFailure = err => ({
  type: GET_MY_REQUESTS_FAILURE,
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
