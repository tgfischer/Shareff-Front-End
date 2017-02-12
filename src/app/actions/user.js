import {
  BASE_URL, GET_TARGET_USER_REQUEST, GET_TARGET_USER_SUCCESS, GET_TARGET_USER_FAILURE
} from '../constants/constants';

const getTargetUserRequest = () => ({
  type: GET_TARGET_USER_REQUEST,
  isFetching: true
});

const getTargetUserSuccess = ({targetUser, targetItems}) => ({
  type: GET_TARGET_USER_SUCCESS,
  isFetching: false,
  targetUser,
  targetItems
});

const getTargetUserFailure = err => ({
  type: GET_TARGET_USER_FAILURE,
  isFetching: false,
  err
});

/**
 * Get the targetted user information
 */
export const getTargetUser = userId => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId})
  };

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(getTargetUserRequest());

    return fetch(`${BASE_URL}/user/get_target_user`, config).then(res => res.json()).then(({targetUser, targetItems, err}) => {
      if (targetUser) {
        // Dispatch the success action
        return dispatch(getTargetUserSuccess({targetUser, targetItems}));
      }

      // If there was a problem, we want to dispatch the error condition
      return dispatch(getTargetUserFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getTargetUserFailure(err));
    });
  };
};
