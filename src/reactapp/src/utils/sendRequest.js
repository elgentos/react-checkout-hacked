import env from './env';
import config from '../config';
import RootElement from './rootElement';
import LocalStorage from './localStorage';

export const RESPONSE_TEXT = 'text';
export const RESPONSE_JSON = 'json';

const storeCode = env.storeCode || RootElement.getStoreCode();

export default function sendRequest(
  dispatch,
  queryParams = {},
  responseType = 'json',
  additionalHeaders = {},
  relativeUrl = null,
  isGetRequest = false
) {
  const headers = {
    'Content-Type': 'application/json',
    Store: storeCode,
    ...additionalHeaders,
  };
  const method = isGetRequest ? 'GET' : 'POST';
  const token = LocalStorage.getCustomerToken();
  const url = `${config.baseUrl}${relativeUrl || '/graphql'}`;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchOptions = { headers, method };

  if (!isGetRequest) {
    fetchOptions.body = JSON.stringify({ ...queryParams });
  }

  return fetch(url, fetchOptions)
    .then((response) => {
      if (responseType === RESPONSE_TEXT) return response.text();

      return response.json();
    })
    .catch((exception) => {
      console.error(exception);
      throw exception;
    });
}
