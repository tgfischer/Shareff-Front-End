import {BASE_URL, Actions} from '../../constants/constants';

const getScheduleRequest = () => ({
  type: Actions.GET_SCHEDULE_REQUEST,
  isFetching: true
});

const getScheduleSuccess = user => ({
  type: Actions.GET_SCHEDULE_SUCCESS,
  isFetching: false,
  success: true,
  user
});

const getScheduleFailure = err => ({
  type: Actions.GET_SCHEDULE_FAILURE,
  isFetching: false,
  success: false,
  err
});

/**
 * Get the user's schedule information from the database
 */
export const getMySchedule = user => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  user.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(getScheduleRequest());

    return fetch(`${BASE_URL}/profile/my_schedule/my_schedule`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(getScheduleFailure(err));
      }

      // Dispatch the success action
      return dispatch(getScheduleSuccess(user));
    }).catch(err => {
      console.log(err);
      return dispatch(getScheduleFailure(err));
    });
  };
};
