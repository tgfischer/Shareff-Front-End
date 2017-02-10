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
    error: 'Error!',
    okay: 'Okay',
    cancel: 'Cancel',
    close: 'Close'
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
   * Upload file messages
   */
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
    location: 'Location',
    maxPriceLabel: 'Maximum Price: ${price}',
    maxDistanceLabel: 'Maximum Distance: {distance}km'
  },

  /**
   * Profile page messages
   */
  profile: {
    title: 'Welcome back, {firstName} {lastName}',
    info: 'Personal Infomation',
    messages: 'Messages',
    schedule: 'Rent Schedule',
    billing: 'Billing',
    myItems: 'My Items',
    addItem: 'Upload Item',
    incomingRequests: 'Incoming Rent Requests'
  },

  /**
   * Personal Info messages
   */
  personalInfo: {
    title: 'Update your personal information',
    subTitle: 'Your name and email address will be visible to others',
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
    updateInfoButton: 'Update Information',
    profilePhoto: {
      title: 'Upload your profile photo',
      label: 'Choose a new profile photo below'
    },
    modal: {
      success: 'Your personal information was successfully updated'
    }
  },

  /**
   * Messages messages
   */
  messages: {
    title: 'Chatting with {firstName} {lastName}',
    requestedItem: 'Requested Item: {item}',
    inputLabel: 'Enter your message',
    inputPlaceholder: 'Enter your message...',
    sendButton: 'Send',
    selectRecipientHeader: 'No Conversation Selected',
    selectRecipientSubHeader: 'Choose someone in the sidebar to talk to'
  },

  /**
   * Rent Item Info messages
   */
  myItems: {
    title: 'Items available for rent',
    columns: {
      title: 'Title',
      category: 'Category',
      description: 'Description',
      price: 'Price',
      termsOfUse: 'Terms of Use'
    }
  },
  /**
   * Upload Item messages
   */
  addItem: {
    pageTitle: 'Upload an item for rent',
    title: 'Title',
    description: 'Description',
    descriptionPlaceholder: 'Tell us about your item. This can include condition of the item, how long you\'ve had it for, or anything that can help your potential renter learn more about the item.',
    category: 'Category',
    price: 'Price',
    terms: 'Terms of Use',
    termsPlaceholder: 'Write down your terms and conditions for renting your item. This could include uses of the item, what time you want it by, or anything else you want to mention.',
    uploadPhotoButton: 'Browse',
    uploadButton: 'Upload',
    modal: {
      uploadPhotosSuccess: 'Your photo(s) were successfully uploaded',
      addItemSuccess: 'Your item was successfully uploaded'
    }
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
   * Listings messages
   */
  listings: {
    title: 'Search Results for: \'{q}\''
  },

  /**
   * Item messages
   */
  item: {
    subheader: 'Price: ${price} {costPeriod}, Location: {location}',
    viewItemButton: 'View Item'
  },

  /**
   * No items found messages
   */
  noItemsFound: {
    title: 'No Items Found',
    content: 'No items were found. Change your search settings, and try again.'
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
    photosTitle: 'Photos of the item',
    modal: {
      title: 'Request to Rent Item',
      description: 'Select the dates that you would like to rent the item on',
      cost: 'Cost to Rent Item',
      invalidDates: 'Select valid start and end dates to calculate the price',
      makeRequestButton: 'Make Request',
      success: 'Your request to rent this item was successful. You will be notified once the owner has reviewed this request',
      messageLabel: 'Message',
      messagePlaceholder: 'Enter a message to send to the owner'
    }
  },

  request: {
    status: {
      accept: 'Accept',
      reject: 'Reject'
    }
  },

  /**
   * Incoming rent requests messages
   */
  incomingRequests: {
    title: 'View your incoming rent requests',
    subTitle: 'Click on a row to accept or decline the request',
    columns: {
      itemTitle: 'Requested Item',
      rentersName: 'Renter\'s Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status'
    },
    modal: {
      title: 'Rent Request for \'{itemTitle}\'',
      updateStatusLabel: 'Choose whether to accept or reject this request',
      updateStatusButton: 'Update Request Status',
      viewItemButton: 'View Rental Item',
      viewRentersProfileButton: 'View Renter\'s Profile'
    }
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
