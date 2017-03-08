import moment from 'moment';

export const bodyBuilder = payload => {
  let body = '';

  // Iterate over all of the properties, adding them to the body
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      body += `${key}=${payload[key]}&`;
    }
  }

  // Remove the trailing &
  return body.substring(0, body.length - 1);
};

/**
 * Get the options from the list of values
 */
export const getOptions = ({values, intl}) => {
  const {formatMessage} = intl;
  const options = [];

  for (let i = 0; i < values.length; i++) {
    options.push({
      text: formatMessage({id: values[i]}),
      value: values[i]
    });
  }

  return options;
};

/**
 * Calcualte the total cost of a rent request
 */
export const calculatePrice = (startDate, endDate, price) => {
  const start = moment(startDate.date);
  const end = moment(endDate.date);
  const duration = moment.duration(end.diff(start)).asHours();
  const totalPrice = (duration * price).toFixed(2);
  return totalPrice;
};
