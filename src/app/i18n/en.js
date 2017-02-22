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
    price: 'Price',
    terms: 'Terms of Use',
    termsPlaceholder: 'Write down your terms and conditions for renting your item. This could include uses of the item, what time you want it by, or anything else you want to mention.',
    uploadPhotoButton: 'Browse',
    addItemButton: 'Add Item',
    uploadPhotos: 'Upload Photos of Your Item',
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
   * My Requests messages
   */
  myRequests: {
    title: 'My Rent Requests',
    subTitle: 'Click on a row delete the request, view the item page, or view the owner\'s profile',
    columns: {
      itemTitle: 'Requested Item',
      ownersName: 'Owner\'s Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status'
    },
    modal: {
      title: 'Delete Rent Request',
      content: 'Would you like to delete this rent request?',
      viewItemButton: 'View Rental Item',
      viewOwnersProfileButton: 'View Owner\'s Profile',
      cancelRequestButton: 'Delete Request'
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
    title: 'Update your billing information',
    subTitle: 'Don\'t worry, your information will remain secure!',
    saveChangesButton: 'Save Changes',
    modal: {
      success: 'Your billing information was successfully updated'
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
