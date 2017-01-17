/**
 * Define any text that will be used in the application
 */
const en = {
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
  navbar: {
    title: 'Shareff',
    home: 'Home',
    rentalListings: 'Rental Listings',
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
  }
};

/**
 * React-Intl v2 does not support nested objects; it expects a flat structure.
 * Therefore we need to flatten the object before passing it on
 */
const flatten = (nestedMessages, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flatten(value, prefixedKey));
    }

    return messages;
  }, {});
};

export default flatten(en);
