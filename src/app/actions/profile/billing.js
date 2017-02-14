import {BASE_URL, Actions} from '../../constants/constants';

const updateBillingInfoRequest = () => ({
  type: Actions.UPDATE_BILLING_INFO_REQUEST,
  isFetching: true
});

const updateBillingInfoSuccess = billingInfo => ({
  type: Actions.UPDATE_BILLING_INFO_SUCCESS,
  isFetching: false,
  billingInfo
});

const updateBillingInfoFailure = err => ({
  type: Actions.UPDATE_BILLING_INFO_FAILURE,
  isFetching: false,
  err
});

export const updateBillingInfo = (info, {userId}) => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  const token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({info, userId, token})
  };

  return dispatch => {
    // kick off request to API
    dispatch(updateBillingInfoRequest());

    return fetch(`${BASE_URL}/profile/billing/update_billing_info`, config).then(res => res.json()).then(({billingInfo, err}) => {
      if (!err) {
        // Dispatch the success action
        return dispatch(updateBillingInfoSuccess(billingInfo));
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(updateBillingInfoFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(updateBillingInfoFailure(err));
    });
  };
};
