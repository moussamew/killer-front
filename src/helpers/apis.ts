import { RequestError, RequestParams } from './types';

export const request = async <T>(
  url: string,
  requestParams?: RequestParams,
): Promise<T & RequestError> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: requestParams?.method,
    body: requestParams?.body,
  });

  const result = await response.json();

  if (result.statusCode < 200 || result.statusCode > 300) {
    // eslint-disable-next-line no-console
    console.error(`[API ${result.statusCode}] ${result.message}.`);
  }

  return result;
};
