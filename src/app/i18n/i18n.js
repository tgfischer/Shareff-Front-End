import en from './en';

/**
 * React-Intl v2 does not support nested objects; it expects a flat structure.
 * Therefore we need to flatten the object before passing it on
 */
export function flatten(nestedMessages, prefix = '') {
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
}

/**
 * Export the messages so they can be consumed by react-intl
 */
export const i18n = {
  intl: {
    messages: en
  }
};
