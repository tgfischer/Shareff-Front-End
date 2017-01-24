/**
 * The base URL for the backend of the application
 */
export const BASE_URL = '//localhost:4000';

/**
 * The path to the static photos folder on the server
 */
export const PHOTOS_URL = `${BASE_URL}/photos`;

/**
 * The path to the generic photo placeholder
 */
export const PHOTO_PLACEHOLDER_URL = `${PHOTOS_URL}/white-image.png`;

/**
 * The path to the uploads folder
 */
export const UPLOADS_FOLDER_URL = `${BASE_URL}/uploads`;

/**
 * The path to the location where the profile photos are stored on the server
 */
export const UPLOAD_PROFILE_PHOTO_FOLDER_URL = `${UPLOADS_FOLDER_URL}/profile`;

/**
 * The path to the route that handles uploading a user's profile photo
 */
export const UPLOAD_PROFILE_PHOTO_ROUTE = `${BASE_URL}/profile/upload_profile_photo`;

/**
 * Actions for logging into the application
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * Actions for signing up for the application
 */
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

/**
 * Actions for logging out of the application
 */
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/**
 * Actions for retreiving the user information from the database
 */
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

/**
 * Actions for getting the rental listings
 */
export const GET_LISTINGS_REQUEST = 'GET_LISTINGS_REQUEST';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_FAILURE = 'GET_LISTINGS_FAILURE';

/**
 * Actions for getting the user's personal information
 */
export const GET_PERSONAL_INFO_REQUEST = 'GET_PERSONAL_INFO_REQUEST';
export const GET_PERSONAL_INFO_SUCCESS = 'GET_PERSONAL_INFO_SUCCESS';
export const GET_PERSONAL_INFO_FAILURE = 'GET_PERSONAL_INFO_FAILURE';
