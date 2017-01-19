/**
 * The base URL for the backend of the application
 */
export const BASE_URL = '//localhost:4000';

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
