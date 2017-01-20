import {flatten} from './i18n';

/**
 * Define any English text that will be used in the application
 */
const en = {
  /**
   * Breadcrumb messages
   */
  breadcrumb: {
    home: 'Home',
    profile: 'Profile'
  },

  /**
   * Modal messages
   */
  modal: {
    success: 'Success!',
    updatePersonalInfoSuccess: 'Your personal information was successfully updated',
    error: 'Error!',
    okay: 'Okay',
    cancel: 'Cancel'
  },

  /**
   * Calendar Range messages
   */
  calendarRange: {
    startLabel: 'Start Date',
    startPlaceholder: 'Start',
    endLabel: 'End Date',
    endPlaceholder: 'End'
  },

  /**
   * Nav Bar messages
   */
  navBar: {
    title: 'Shareff',
    home: 'Home',
    rentalListings: 'Rental Listings',
    profile: 'Profile',
    login: 'Login',
    signUp: 'Sign Up',
    logOut: 'Log Out'
  },

  /**
   * Masthead messages
   */
  masthead: {
    title: 'Shareff',
    desc: 'Helping you find the things you need',
    search: 'Search',
    advancedSettings: 'Advanced Settings',
    location: 'Location'
  },

  /**
   * Profile page messages
   */
  profile: {
    title: 'Welcome back, {firstName} {lastName}',
    personalInfo: 'Personal Infomation',
    rentSchedule: 'Rent Schedule',
    billing: 'Billing'
  },

  /**
   * Personal Info messages
   */
  personalInfo: {
    title: 'Update your personal information',
    firstName: 'First Name',
    lastName: 'Last Name',
    addressOne: 'Address Line 1',
    addressTwo: 'Address Line 2',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    ccn: 'Credit Card Number',
    cvn: 'CVN',
    expiryDate: 'Expiry Date',
    updateButton: 'Update'
  },

  /**
   * Login messages
   */
  login: {
    title: 'Login',
    email: 'Email',
    password: 'Password',
    loginButton: 'Login',
    infoMessageTitle: 'New to Shareff?',
    infoMessageContent: 'Sign up for a Shareff account today!'
  },

  /**
   * Sign Up Messages
   */
  signUp: {
    title: 'Sign Up',
    firstName: 'First Name',
    lastName: 'Last Name',
    addressOne: 'Address Line 1',
    addressTwo: 'Address Line 2',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    ccn: 'Credit Card Number',
    cvn: 'CVN',
    expiryDate: 'Expiry Date',
    signUpButton: 'Sign Up',
    infoMessageTitle: 'Already have an account?',
    infoMessageContent: 'Log into your Shareff account instead!'
  },

  /**
   * Error messages
   */
  error: {
    error: 'Error',
    general: 'Something went wrong while trying to fulfill your request. Please try again later'
  }
};

export default flatten(en);
