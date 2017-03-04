/**
 * The base URL for the backend of the application
 */
export const BASE_URL = '//localhost:4000';

/**
 * The route to the error page. Could technically be anything
 */
export const ERROR_PAGE = '/error-page';

/**
 * The path to the static photos folder on the server
 */
export const PHOTOS_URL = `${BASE_URL}/photos`;

/**
 * The path to the generic photo placeholder
 */
export const PHOTO_PLACEHOLDER_URL = `${PHOTOS_URL}/white-image.png`;

/**
 * The path to the Google Maps marker
 */
export const GOOGLE_MAPS_MARKER_URL = `${PHOTOS_URL}/marker.png`;

/**
 * The path to the uploads folder
 */
export const UPLOADS_FOLDER_URL = `${BASE_URL}/uploads`;

/**
 * The maximum price in the maxPrice input, which is located in the Advanced
 * Settings when you search
 */
export const ADVANCED_SETTINGS_MAX_PRICE = 2000;

/**
 * The maximum distance in the maxDistance input, which is located in the Advanced
 * Settings when you search
 */
export const ADVANCED_SETTINGS_MAX_DISTANCE = 100;

export const ACCEPT_RENT_REQUEST = 'RRS_REQUEST_ACCEPTED';
export const REJECT_RENT_REQUEST = 'RRS_REQUEST_REJECTED';

export const categories = [
  'category.appliances',
  'category.atvs',
  'category.automobiles',
  'category.baby',
  'category.bicycles',
  'category.books',
  'category.clothing',
  'category.computer',
  'category.computerAccessories',
  'category.costumes',
  'category.electronics',
  'category.entertainment',
  'category.farm',
  'category.furniture',
  'category.heavyMachinery',
  'category.hobbies',
  'category.horse',
  'category.office',
  'category.pet',
  'category.school',
  'category.snowmobiles',
  'category.sports',
  'category.tent',
  'category.tools',
  'category.toys',
  'category.trailer',
  'category.tv',
  'category.videoGames'
];

/**
 * Cost period messages
 */
export const costPeriods = [
  'costPeriod.hour',
  'costPeriod.day',
  'costPeriod.week',
  'costPeriod.month'
];

/**
 * The list of request statuses the owner can set
 */
export const UPDATE_REQUEST_STATUS_OPTIONS = [{
  value: ACCEPT_RENT_REQUEST,
  key: 'request.ownerActions.accept'
}, {
  value: REJECT_RENT_REQUEST,
  key: 'request.ownerActions.reject'
}];

export const Actions = {
  /**
   * Actions for logging into the application
   */
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  /**
   * Actions for signing up for the application
   */
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',

  /**
   * Actions for logging out of the application
   */
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  /**
   * Actions for retreiving the user information from the database
   */
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  /**
   * Actions for getting the rental listings
   */
  GET_LISTINGS_REQUEST: 'GET_LISTINGS_REQUEST',
  GET_LISTINGS_SUCCESS: 'GET_LISTINGS_SUCCESS',
  GET_LISTINGS_FAILURE: 'GET_LISTINGS_FAILURE',

  /**
   * Actions for getting the user's personal information
   */
  GET_PERSONAL_INFO_REQUEST: 'GET_PERSONAL_INFO_REQUEST',
  GET_PERSONAL_INFO_SUCCESS: 'GET_PERSONAL_INFO_SUCCESS',
  GET_PERSONAL_INFO_FAILURE: 'GET_PERSONAL_INFO_FAILURE',

  /**
   * Actions for uploading a user's profile photo
   */
  UPLOAD_PHOTOS_REQUEST: 'UPLOAD_PHOTOS_REQUEST',
  UPLOAD_PHOTOS_SUCCESS: 'UPLOAD_PHOTOS_SUCCESS',
  UPLOAD_PHOTOS_FAILURE: 'UPLOAD_PHOTOS_FAILURE',

  /**
   * Actions for uploading items for rent
   */
  ADD_ITEM_REQUEST: 'ADD_ITEM_REQUEST',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
  ADD_ITEM_FAILURE: 'ADD_ITEM_FAILURE',

  /**
   * Actions for getting a rental item
   */
  GET_RENTAL_ITEM_REQUEST: 'GET_RENTAL_ITEM_REQUEST',
  GET_RENTAL_ITEM_SUCCESS: 'GET_RENTAL_ITEM_SUCCESS',
  GET_RENTAL_ITEM_FAILURE: 'GET_RENTAL_ITEM_FAILURE',

  /**
   * Actions for getting a list of my items
   */
  GET_MY_ITEMS_REQUEST: 'GET_MY_ITEMS_REQUEST',
  GET_MY_ITEMS_SUCCESS: 'GET_MY_ITEMS_SUCCESS',
  GET_MY_ITEMS_FAILURE: 'GET_MY_ITEMS_FAILURE',

  /**
   * Actions for getting a list item schedules
   */
  GET_MY_SCHEDULE_REQUEST: 'GET_MY_SCHEDULE_REQUEST',
  GET_MY_SCHEDULE_SUCCESS: 'GET_MY_SCHEDULE_SUCCESS',
  GET_MY_SCHEDULE_FAILURE: 'GET_MY_SCHEDULE_FAILURE',

  /**
   * Actions for making a rent request
   */
  MAKE_RENT_REQUEST_REQUEST: 'MAKE_RENT_REQUEST_REQUEST',
  MAKE_RENT_REQUEST_SUCCESS: 'MAKE_RENT_REQUEST_SUCCESS',
  MAKE_RENT_REQUEST_FAILURE: 'MAKE_RENT_REQUEST_FAILURE',

  /**
   * Actions for getting conversations
   */
  GET_CONVERSATIONS_REQUEST: 'GET_CONVERSATIONS_REQUEST',
  GET_CONVERSATIONS_SUCCESS: 'GET_CONVERSATIONS_SUCCESS',
  GET_CONVERSATIONS_FAILURE: 'GET_CONVERSATIONS_FAILURE',

  /**
   * Actions for getting messages
   */
  GET_MESSAGES_REQUEST: 'GET_MESSAGES_REQUEST',
  GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',
  GET_MESSAGES_FAILURE: 'GET_MESSAGES_FAILURE',

  /**
   * Actions for getting a list of my rent requests
   */
  GET_MY_REQUESTS_REQUEST: 'GET_MY_REQUESTS_REQUEST',
  GET_MY_REQUESTS_SUCCESS: 'GET_MY_REQUESTS_SUCCESS',
  GET_MY_REQUESTS_FAILURE: 'GET_MY_REQUESTS_FAILURE',

  /**
   * Actions for deleting a rent request
   */
  CANCEL_REQUEST_REQUEST: 'CANCEL_REQUEST_REQUEST',
  CANCEL_REQUEST_SUCCESS: 'CANCEL_REQUEST_SUCCESS',
  CANCEL_REQUEST_FAILURE: 'CANCEL_REQUEST_FAILURE',

  /**
   * Actions for getting the incoming rent requests
   */
  GET_INCOMING_REQUESTS_REQUEST: 'GET_INCOMING_REQUESTS_REQUEST',
  GET_INCOMING_REQUESTS_SUCCESS: 'GET_INCOMING_REQUESTS_SUCCESS',
  GET_INCOMING_REQUESTS_FAILURE: 'GET_INCOMING_REQUESTS_FAILURE',

  /**
   * Actions for updating the request status
   */
  UPDATE_STATUS_REQUEST: 'UPDATE_STATUS_REQUEST',
  UPDATE_STATUS_SUCCESS: 'UPDATE_STATUS_SUCCESS',
  UPDATE_STATUS_FAILURE: 'UPDATE_STATUS_FAILURE',

  /**
   * Actions for getting a targetted user to populate their profile
   */
  GET_TARGET_USER_REQUEST: 'GET_TARGET_USER_REQUEST',
  GET_TARGET_USER_SUCCESS: 'GET_TARGET_USER_SUCCESS',
  GET_TARGET_USER_FAILURE: 'GET_TARGET_USER_FAILURE',

  /**
   * Actions for updating your billing information
   */
  UPDATE_BILLING_INFO_REQUEST: 'UPDATE_BILLING_INFO_REQUEST',
  UPDATE_BILLING_INFO_SUCCESS: 'UPDATE_BILLING_INFO_SUCCESS',
  UPDATE_BILLING_INFO_FAILURE: 'UPDATE_BILLING_INFO_FAILURE',

  /**
   * Actions for deleting a rental item of the owner
   */
  REMOVE_MY_ITEM_REQUEST: 'REMOVE_MY_ITEM_REQUEST',
  REMOVE_MY_ITEM_SUCCESS: 'REMOVE_MY_ITEM_SUCCESS',
  REMOVE_MY_ITEM_FAILURE: 'REMOVE_MY_ITEM_FAILURE',

  /**
   * Actions for deleting a rental item of the owner
   */
  UPDATE_MY_ITEM_REQUEST: 'UPDATE_MY_ITEM_REQUEST',
  UPDATE_MY_ITEM_SUCCESS: 'UPDATE_MY_ITEM_SUCCESS',
  UPDATE_MY_ITEM_FAILURE: 'UPDATE_MY_ITEM_FAILURE'
};
