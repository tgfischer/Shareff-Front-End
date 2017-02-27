import {Actions} from '../constants/constants';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
export const reducers = (state = {
  isFetching: false,
  isAuthenticated: Boolean(localStorage.getItem('token'))
}, action) => {
  switch (action.type) {
    case Actions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case Actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        message: undefined,
        user: action.user
      });
    case Actions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.err
      });
    case Actions.SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case Actions.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        err: undefined,
        user: action.user
      });
    case Actions.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.err
      });
    case Actions.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        user: undefined,
        err: undefined
      });
    case Actions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: undefined
      });
    case Actions.GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case Actions.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        err: undefined,
        user: action.user
      });
    case Actions.GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
        err: action.err
      });
    case Actions.GET_PERSONAL_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined,
        success: undefined
      });
    case Actions.GET_PERSONAL_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        user: action.user,
        success: action.success
      });
    case Actions.GET_PERSONAL_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        success: undefined,
        err: action.err
      });
    case Actions.GET_LISTINGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        listings: undefined,
        err: undefined
      });
    case Actions.GET_LISTINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        listings: action.listings
      });
    case Actions.GET_LISTINGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        listings: undefined,
        err: action.err
      });
    case Actions.UPLOAD_PHOTOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case Actions.UPLOAD_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        user: action.user
      });
    case Actions.UPLOAD_PHOTOS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err
      });
    case Actions.ADD_ITEM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case Actions.ADD_ITEM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined
      });
    case Actions.ADD_ITEM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err
      });
    case Actions.GET_RENTAL_ITEM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        rentalItem: undefined,
        err: undefined
      });
    case Actions.GET_RENTAL_ITEM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        rentalItem: action.rentalItem
      });
    case Actions.GET_RENTAL_ITEM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        rentalItem: undefined,
        err: action.err
      });
    case Actions.GET_MY_ITEMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        myItems: undefined,
        err: undefined
      });
    case Actions.GET_MY_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        myItems: action.myItems
      });
    case Actions.GET_MY_ITEMS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        myItems: undefined,
        err: action.err
      });
    case Actions.GET_MY_SCHEDULE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        mySchedule: undefined,
        err: undefined
      });
    case Actions.GET_MY_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        mySchedule: action.mySchedule
      });
    case Actions.GET_MY_SCHEDULE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        mySchedule: undefined,
        err: action.err
      });
    case Actions.MAKE_RENT_REQUEST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case Actions.MAKE_RENT_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined
      });
    case Actions.MAKE_RENT_REQUEST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err
      });
    case Actions.GET_CONVERSATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        conversations: undefined,
        err: undefined
      });
    case Actions.GET_CONVERSATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        conversations: action.conversations
      });
    case Actions.GET_CONVERSATIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        conversations: undefined,
        err: action.err
      });
    case Actions.GET_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messages: undefined,
        recipient: undefined,
        rentRequest: undefined,
        item: undefined,
        err: undefined
      });
    case Actions.GET_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        messages: action.messages,
        recipient: action.recipient,
        rentRequest: action.rentRequest,
        item: action.item
      });
    case Actions.GET_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messages: undefined,
        recipient: undefined,
        rentRequest: undefined,
        item: undefined,
        err: action.err
      });
    case Actions.GET_MY_REQUESTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        myRequests: undefined,
        err: undefined
      });
    case Actions.GET_MY_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        myRequests: action.myRequests
      });
    case Actions.GET_MY_REQUESTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        myRequests: undefined,
        err: action.err
      });
    case Actions.CANCEL_REQUEST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        err: undefined
      });
    case Actions.CANCEL_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        myRequests: action.myRequests
      });
    case Actions.CANCEL_REQUEST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err
      });
    case Actions.GET_INCOMING_REQUESTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        requests: undefined,
        err: undefined
      });
    case Actions.GET_INCOMING_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        requests: action.requests
      });
    case Actions.GET_INCOMING_REQUESTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        requests: undefined,
        err: action.err
      });
    case Actions.UPDATE_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        requests: undefined,
        err: undefined
      });
    case Actions.UPDATE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        requests: action.requests
      });
    case Actions.UPDATE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        requests: undefined,
        err: action.err
      });
    case Actions.GET_TARGET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        targetUser: undefined,
        targetItems: undefined,
        err: undefined
      });
    case Actions.GET_TARGET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        err: undefined,
        targetUser: action.targetUser,
        targetItems: action.targetItems
      });
    case Actions.GET_TARGET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        targetUser: undefined,
        targetItems: undefined,
        err: action.err
      });
    default:
      return state;
  }
};
