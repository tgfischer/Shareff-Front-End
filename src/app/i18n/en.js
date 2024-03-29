import {flatten} from './i18n';

/**
 * Define any English text that will be used in the application
 */
const en = {
  /**
   * Category messages
   */
  category: {
    appliances: 'Appliances',
    atvs: 'ATVs',
    automobiles: 'Automobiles',
    baby: 'Baby Items',
    bicycles: 'Bicycles',
    books: 'Books',
    clothing: 'Clothing',
    computer: 'Computers',
    computerAccessories: 'Computer Accesories',
    costumes: 'Costumes',
    electronics: 'Electronics',
    entertainment: 'Entertainment',
    farm: 'Farm Equipment',
    furniture: 'Furniture',
    heavyMachinery: 'Heavy Machinery',
    hobbies: 'Hobbies',
    horse: 'Horse Equipment',
    office: 'Office Supplies',
    pet: 'Pet Supplies',
    school: 'School Supplies',
    snowmobiles: 'Snowmobiles',
    sports: 'Sporting Goods',
    tent: 'Tents',
    tools: 'Tools',
    toys: 'Toys',
    trailer: 'Trailers',
    tv: 'Televisions',
    videoGames: 'Video Games'
  },

  /**
   * Cost period messages
   */
  costPeriod: {
    hour: 'Hour',
    day: 'Day',
    week: 'Week',
    month: 'Month'
  },

  /**
   * Breadcrumb messages
   */
  breadcrumb: {
    home: 'Home',
    profile: 'Profile',
    mySchedule: 'My Schedule',
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
   * Full calendar messages
   */
  fullCalendar: {
    today: 'Today'
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
    maxPriceLabel: 'Maximum Price: ${price} per Hour',
    maxDistanceLabel: 'Maximum Distance: {distance}km'
  },

  /**
   * Profile page messages
   */
  profile: {
    title: 'Welcome back, {firstName} {lastName}',
    info: 'Personal Infomation',
    messages: 'Messages',
    mySchedule: 'My Schedule',
    billing: 'Billing',
    myItems: 'My Items',
    addItem: 'Add Item',
    incomingRequests: 'Incoming Rent Requests',
    myRequests: 'My Rent Requests',
    viewProfileButton: 'View Your Profile'
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
    saveChangesButton: 'Save Changes',
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
    title: 'My Items',
    subTitle: 'Click on a row to view that particular item',
    columns: {
      title: 'Title',
      category: 'Categories',
      price: 'Price'
    }
  },

  /**
   * adding item messages
   */
  addItem: {
    pageTitle: 'Add an Item for Rent',
    title: 'Title',
    description: 'Description',
    costPeriod: 'Cost Period',
    per: 'Per',
    descriptionPlaceholder: 'Tell us about your item. This can include condition of the item, how long you\'ve had it for, or anything that can help your potential renter learn more about the item.',
    category: 'Category',
    price: 'Price Per Hour',
    terms: 'Terms of Use',
    termsPlaceholder: 'Write down your terms and conditions for renting your item. This could include uses of the item, what time you want it by, or anything else you want to mention.',
    uploadPhotoButton: 'Browse',
    addItemButton: 'Add Item',
    itemAvailablitiy: 'Item Availablitiy',
    availabilityDescription: 'Select the days your item will be unavailable to rent',
    uploadPhotos: 'Upload Photos of Your Item',
    modal: {
      uploadPhotosSuccess: 'Your photo(s) were successfully uploaded',
      addItemSuccess: 'Your item was successfully uploaded',
      noBankAccount: 'It seems that you have no bank account on file. You must update your banking information on the billing page in order to add items',
      noCreditCard: 'It seems that you do not have a credit card on file. You must update your credit card information on the billing page in order to request to rent',
      updateBillingInfo: 'Update Billing Information',
      continueAnyways: 'Continue Anyways'
    },
    availabilityModal: {
      title: 'Mark Item Unavailable',
      description: 'Select the date range your item will be unavailable to rent',
      markUnavailable: 'Mark Unavailable'
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
    title: 'Search Results for: \'{q}\'',
    prev: 'Prev Page',
    next: 'Next Page'
  },

  /**
   * Item messages
   */
  item: {
    subheader: 'Price: ${price} per {costPeriod}, Owner: {ownerFirstName} {ownerLastName}, Location: {location}',
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
    priceContent: '${price} per {costPeriod}',
    addressTitle: 'Address',
    ratingTitle: 'Owner Rating',
    noRatings: 'No one has rated this owner yet',
    description: 'Item Description',
    termsOfUse: 'Terms of Use',
    messageOwnerButton: 'Message Owner',
    requestToRentButton: 'Request to Rent',
    requestToEditButton: 'Edit Rental Item Infomation',
    photosTitle: 'Photos of the item',
    tooltip: {
      notLoggedIn: 'You must be logged in to rent this item',
      noCreditCard: 'You must have a credit card attached to your account in order to rent this item'
    },
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
      notificationPending: 'Notification Pending',
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      cancelled: 'Cancelled'
    },
    ownerActions: {
      accept: 'Accept',
      reject: 'Reject'
    }
  },

  /**
   * My Requests messages
   */
  myRequests: {
    title: 'My Rent Requests',
    subTitle: 'Click on a row to cancel the request, view the item page, or view the owner\'s profile',
    columns: {
      itemTitle: 'Requested Item',
      ownersName: 'Owner\'s Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status'
    },
    modal: {
      title: 'Rent Request Actions',
      content: 'Use the actions below to cancel the rent request, or view details about the request. Note, you cannot cancel a request that has already been accepted, rejected, or cancelled',
      viewItemButton: 'View Rental Item',
      viewOwnersProfileButton: 'View Owner\'s Profile',
      cancelRequestButton: 'Cancel Request'
    }
  },

  /**
   * My Schedule messages
   */
  mySchedule: {
    modal: {
      title: 'Booking for \'{itemName}\'',
      startDate: 'Start Date:',
      endDate: 'End Date:',
      viewBookingButton: 'View Booking Information',
      viewItemButton: 'View Item',
      close: 'Close'
    }
  },

  /**
   * Rent schedule messages
   */
  schedule: {
    calendar: {
      label: 'Rent Schedule'
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
      endDate: 'End Date'
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
   * User profile messages
   */
  user: {
    title: '{firstName} {lastName}\'s Profile',
    description: 'Description',
    noDescriptionProvided: 'This user has not provided a description',
    itemsTitle: 'Available Items',
    itemsSubTitle: 'Click on a row to view more details about that particular item',
    noRentalItems: 'This user has not put any of their items up for rent',
    ratingTitle: 'Rating',
    noAvgRating: 'No one has rated {firstName} yet',
    locationTitle: 'Location',
    columns: {
      title: 'Title',
      category: 'Category',
      price: 'Price'
    }
  },

  billing: {
    title: 'Billing Information',
    subTitle: 'Don\'t worry, your information is stored securely!',
    creditCardInfo: 'Credit Card Information',
    creditCardInfoSubtitle: 'If you plan on renting items, we\'ll need to know what credit card to charge',
    bankAccountInfo: 'Bank Account Information',
    bankAccountInfoSubtitle: 'If you plan on putting items up for rent, we\'ll need to know where to transfer funds',
    accountHolderName: 'Account Holder Name',
    accountNumber: 'Account Number',
    institutionNumber: 'Institution Number',
    transitNumber: 'Transit Numner',
    dob: 'Date of Birth',
    month: 'Month',
    year: 'Year',
    expiryDate: 'Expiry Date',
    saveChangesButton: 'Save All Changes',
    noCreditCardTitle: 'No Credit Card',
    noCreditCardContent: 'You currently do not have a credit card on file',
    noBankAccountTitle: 'No Bank Account',
    noBankAccountContent: 'You currently do not have a bank account connected',
    modal: {
      success: 'Your billing information was successfully updated',
      creditCardError: 'The credit card fields are not filled out properly. Make sure the CCN and CVN fields are numbers',
      bankAccountError: 'The bank details are not filled out properly. Make sure the Account Number, Transit Number, and Institution Number are numbers',
      noNewValuesError: 'All fields remained the same, nothing was saved',
      allFieldsAreEmpty: 'All fields are empty, nothing was saved'
    }
  },

  /**
   * Error messages
   */
  error: {
    error: 'Error',
    general: 'Something went wrong while trying to fulfill your request. Please try again later',
    unauthorized: 'You are unauthorized to perform this action. Try logging out, and logging back in',
    notFound: 'The page that you are looking for could not be found'
  },

  /**
   * Edit Item
   */
  editItem: {
    title: 'Editing \'{itemTitle}\'',
    saveChangesButton: 'Save Changes',
    removeItemButton: 'Remove Item',
    cancelButton: 'Cancel Changes',
    photosTitle: 'Photos of Your Item',
    removeModal: {
      success: 'Your rental item has been successfully removed.'
    },
    updateModal: {
      success: 'Your rental item was successfully updated.'
    }
  },

  /**
   * Booking Page
   */
  booking: {
    title: 'Booking Information',
    statusHeader: 'BOOKING STATUS',
    startDate: 'Start Date',
    endDate: 'End Date',
    pending: 'Pending',
    active: 'Active',
    complete: 'Complete',
    owner: 'Owner',
    renter: 'Renter',
    item: 'Item',
    totalCostHeader: 'TOTAL RENTAL COST',
    paymentStatusHeader: 'PAYMENT STATUS',
    bookingStatusTitle: 'Booking Status',
    bookingStatusSubTitle: 'The current status of the booking process is shown below',
    bookingTimeTitle: 'Booking Times',
    bookingTimeSubTitle: 'These are the times that the item is scheduled to be rented out',
    rejectButton: 'Reject',
    confirmButton: 'Confirm',
    status: {
      pending: 'Pending',
      pendingDescription: 'Please wait for the scheduled time that this item is to be rented',
      active: 'Active',
      activeDescription: 'The item is currently being rented',
      completed: 'Completed'
    },
    activeResponses: {
      ownerDelivered: 'Did you deliver this rental item to the renter?',
      renterReceived: 'Did you receive your rental item from the owner?',
      ownerReceived: 'Did you receive your rental item back from the renter?',
      renterDelivered: 'Did you return this rental item to the owner?'
    },
    provideRating: 'Please rate your experience with {otherUserName}:',
    thanksForRating: 'Thank you for your feedback!'
  }
};

export default flatten(en);
