import {BASE_URL, Actions} from '../../constants/constants';

const getConversationsRequest = () => ({
  type: Actions.GET_CONVERSATIONS_REQUEST,
  isFetching: true
});

const getConversationsSuccess = conversations => ({
  type: Actions.GET_CONVERSATIONS_SUCCESS,
  isFetching: false,
  conversations
});

const getConversationsFailure = err => ({
  type: Actions.GET_CONVERSATIONS_FAILURE,
  isFetching: false,
  err
});

const getMessagesRequest = () => ({
  type: Actions.GET_MESSAGES_REQUEST,
  isFetching: true
});

const getMessagesSuccess = ({messages, recipient, rentRequest, item}) => ({
  type: Actions.GET_MESSAGES_SUCCESS,
  isFetching: false,
  messages,
  recipient,
  rentRequest,
  item
});

const getMessagesFailure = err => ({
  type: Actions.GET_MESSAGES_FAILURE,
  isFetching: false,
  err
});

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
