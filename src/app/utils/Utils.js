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
