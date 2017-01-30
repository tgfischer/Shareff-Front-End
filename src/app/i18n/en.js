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
    profile: 'Profile',
    listings: 'Rental Listings'
  },

  /**
   * Modal messages
   */
  modal: {
    success: 'Success!',
    updatePersonalInfoSuccess: 'Your personal information was successfully updated',
    uploadPhotosSuccess: 'Your photo(s) were successfully uploaded',
    uploadItemSuccess: 'Your item was successfully uploaded',
    requestToRentTitle: 'Request to Rent Item',
    requestToRentDetails: 'Select the dates that you would like to rent the item on',
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

  uploadFile: {
    browseButton: 'Browse',
    uploadButton: 'Upload'
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
    messages: 'Messages',
    rentSchedule: 'Rent Schedule',
    billing: 'Billing',
    myItem: 'My Item',
    uploadItem: 'Upload Item'
  },

  /**
   * Personal Info messages
   */
  personalInfo: {
    personalInfoTitle: 'Update your personal information',
    personalInfoSubTitle: 'Your name and email address will be visible to others',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    descriptionTitle: 'Update your profile description',
    descriptionSubTitle: 'This description will be visible to those that visit your profile',
    descriptionLabel: 'Profile Description',
    descriptionPlaceholder: 'Tell us about yourself',
    addressTitle: 'Update your address',
    addressSubTitle: 'Only the city and province that you live in will be visible to others',
    addressOne: 'Address Line 1',
    addressTwo: 'Address Line 2',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code',
    ccn: 'Credit Card Number',
    cvn: 'CVN',
    expiryDate: 'Expiry Date',
    uploadProfilePhoto: 'Upload your profile photo',
    uploadProfilePhotoLabel: 'Choose a new profile photo below',
    updateInfoButton: 'Update Information'
  },

  messages: {
    title: 'Chatting with {firstName} {lastName}',
    subTitle: 'Email: {email}',
    inputLabel: 'Enter your message',
    inputPlaceholder: 'Enter your message...',
    sendButton: 'Send',
    selectRecipientHeader: 'No Conversation Selected',
    selectRecipientSubHeader: 'Choose someone in the sidebar to talk to'
  },

  /**
   * Rent Item Info messages
   */
  myItem: {
    title: 'Items available for rent'
  },
  /**
   * Upload Item messages
   */
  uploadItem: {
    pageTitle: 'Upload an item for rent',
    title: 'Title',
    description: 'Description',
    descriptionPlaceholder: 'Tell us about your item. This can include condition of the item, how long you\'ve had it for, or anything that can help your potential renter learn more about the item.',
    category: 'Category',
    price: 'Price',
    terms: 'Terms of Use',
    termsPlaceholder: 'Write down your terms and conditions for renting your item. This could include uses of the item, what time you want it by, or anything else you want to mention.',
    uploadPhotoButton: 'Browse',
    uploadButton: 'Upload'
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
   * Rental Item messages
   */
  rentalItem: {
    ownerTitle: 'Owner',
    priceTitle: 'Price',
    priceContent: '${price} per day',
    addressTitle: 'Address',
    ratingTitle: 'Owner Rating',
    noRatings: 'No one has rated this owner yet',
    description: 'Item Description',
    termsOfUse: 'Terms of Use',
    messageOwnerButton: 'Message Owner',
    requestToRentButton: 'Request to Rent',
    photosTitle: 'Photos of the item'
  },

  /**
   * Error messages
   */
  error: {
    error: 'Error',
    general: 'Something went wrong while trying to fulfill your request. Please try again later',
    unauthorized: 'You are unauthorized to perform this action. Try logging out, and logging back in'
  }
};

export default flatten(en);
