import {
  BASE_URL, GET_PERSONAL_INFO_REQUEST, GET_PERSONAL_INFO_SUCCESS, GET_PERSONAL_INFO_FAILURE,
  UPLOAD_PROFILE_PHOTO_REQUEST, UPLOAD_PROFILE_PHOTO_SUCCESS, UPLOAD_PROFILE_PHOTO_FAILURE,
  UPLOAD_ITEM_REQUEST, UPLOAD_ITEM_SUCCESS, UPLOAD_ITEM_FAILURE,
  GET_MY_ITEMS_REQUEST, GET_MY_ITEMS_SUCCESS, GET_MY_ITEMS_FAILURE,
  GET_CONVERSATIONS_REQUEST, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATIONS_FAILURE,
  GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE
} from '../constants/constants';

const getPersonalInfoRequest = () => ({
  type: GET_PERSONAL_INFO_REQUEST,
  isFetching: true,
  err: undefined
});

const getPersonalInfoSuccess = user => ({
  type: GET_PERSONAL_INFO_SUCCESS,
  isFetching: false,
  success: true,
  err: undefined,
  user
});

const getPersonalInfoFailure = err => ({
  type: GET_PERSONAL_INFO_FAILURE,
  isFetching: false,
  success: false,
  err
});

const uploadProfilePhotoRequest = () => ({
  type: UPLOAD_PROFILE_PHOTO_REQUEST,
  isFetching: true,
  err: undefined
});

const uploadProfilePhotoSuccess = user => ({
  type: UPLOAD_PROFILE_PHOTO_SUCCESS,
  isFetching: false,
  err: undefined,
  user
});

const uploadProfilePhotoFailure = err => ({
  type: UPLOAD_PROFILE_PHOTO_FAILURE,
  isFetching: false,
  err
});

const uploadItemRequest = () => ({
  type: UPLOAD_ITEM_REQUEST,
  isFetching: true,
  err: undefined
});

const uploadItemSuccess = () => ({
  type: UPLOAD_ITEM_SUCCESS,
  isFetching: false,
  err: undefined
});

const uploadItemFailure = err => ({
  type: UPLOAD_ITEM_FAILURE,
  isFetching: false,
  err
});

const getMyItemsRequest = () => ({
  type: GET_MY_ITEMS_REQUEST,
  isFetching: true,
  err: undefined,
  myItems: undefined
});

const getMyItemsSuccess = myItems => ({
  type: GET_MY_ITEMS_SUCCESS,
  isFetching: false,
  err: undefined,
  myItems
});

const getMyItemsFailure = err => ({
  type: GET_MY_ITEMS_FAILURE,
  isFetching: false,
  myItems: undefined,
  err
});

const getConversationsRequest = () => ({
  type: GET_CONVERSATIONS_REQUEST,
  isFetching: true,
  err: undefined,
  conversations: undefined
});

const getConversationsSuccess = conversations => ({
  type: GET_CONVERSATIONS_SUCCESS,
  isFetching: false,
  err: undefined,
  conversations
});

const getConversationsFailure = err => ({
  type: GET_CONVERSATIONS_FAILURE,
  isFetching: false,
  conversations: undefined,
  err
});

const getMessagesRequest = () => ({
  type: GET_MESSAGES_REQUEST,
  isFetching: true,
  err: undefined,
  messages: undefined,
  recipient: undefined,
  rentRequest: undefined,
  item: undefined
});

const getMessagesSuccess = ({messages, recipient, rentRequest, item}) => ({
  type: GET_MESSAGES_SUCCESS,
  isFetching: false,
  err: undefined,
  messages,
  recipient,
  rentRequest,
  item
});

const getMessagesFailure = err => ({
  type: GET_MESSAGES_FAILURE,
  isFetching: false,
  messages: undefined,
  recipient: undefined,
  rentRequest: undefined,
  item: undefined,
  err
});

/**
 * Get the user's personal information from the database
 */
export const getPersonalInfo = user => {
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
    dispatch(getPersonalInfoRequest());

    return fetch(`${BASE_URL}/profile/personal_info/get_personal_info`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(getPersonalInfoFailure(err));
      }

      // Dispatch the success action
      return dispatch(getPersonalInfoSuccess(user));
    }).catch(err => {
      console.log(err);
      return dispatch(getPersonalInfoFailure(err));
    });
  };
};

/**
 * Get the user's personal information from the database
 */
export const uploadProfilePhoto = formData => {
  const config = {
    method: 'POST',
    body: formData
  };

  return dispatch => {
    // We dispatch request to kickoff the call to the API
    dispatch(uploadProfilePhotoRequest());

    return fetch(`${BASE_URL}/profile/personal_info/upload_profile_photo`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {user, err} = json;

      if (err) {
        // If there was a problem, we want to dispatch the error condition
        console.log(err);
        return dispatch(uploadProfilePhotoFailure(err));
      }

      // Dispatch the success action
      return dispatch(uploadProfilePhotoSuccess(user));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadProfilePhotoFailure(err));
    });
  };
};

export const uploadItem = item => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  item.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  };

  return dispatch => {
    // kick off request to API
    dispatch(uploadItemRequest());

    return fetch(`${BASE_URL}/profile/upload_item/upload_item`, config).then(res => res.json()).then(json => {
      // Get the user's information, and the error
      const {err} = json;

      if (!err) {
        // Dispatch the success action
        return dispatch(uploadItemSuccess());
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(uploadItemFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(uploadItemFailure(err));
    });
  };
};

/**
 * Fetch the list of items that the user has put up for rent
 */
export const getMyItems = owner => {
  // Send the token as well so that we can validate that the user that is logged
  // in is only modifying their own data
  owner.token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(owner)
  };

  return dispatch => {
    // kick off request to API
    dispatch(getMyItemsRequest());

    return fetch(`${BASE_URL}/profile/my_items/my_items`, config).then(res => res.json()).then(json => {
      // Get the list of myItems information, and the error
      const {myItems, err} = json;

      if (!err) {
        // Dispatch the success action
        return dispatch(getMyItemsSuccess(myItems));
      }

      // if there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getMyItemsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getMyItemsFailure(err));
    });
  };
};

/**
 * Fetch a list of conversations
 */
export const getConversations = ({userId}) => {
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
    dispatch(getConversationsRequest());

    return fetch(`${BASE_URL}/profile/messages/get_conversations`, config).then(res => res.json()).then(({conversations, err}) => {
      if (!err) {
        // Dispatch the success action
        return dispatch(getConversationsSuccess(conversations));
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getConversationsFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getConversationsFailure(err));
    });
  };
};

/**
 * Fetch a list of messages between two users
 */
export const getMessages = ({conversationId, requestId, recipientId, userId}) => {
  const token = localStorage.getItem('token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({conversationId, requestId, recipientId, userId, token})
  };

  return dispatch => {
    // kick off request to API
    dispatch(getMessagesRequest());

    return fetch(`${BASE_URL}/profile/messages/get_messages`, config).then(res => res.json()).then(({result, err}) => {
      if (!err) {
        // Dispatch the success action
        return dispatch(getMessagesSuccess(result));
      }

      // If there was a problem, we want to dispatch the error condition
      console.log(err);
      return dispatch(getMessagesFailure(err));
    }).catch(err => {
      console.log(err);
      return dispatch(getMessagesFailure(err));
    });
  };
};
