import { Method } from '@/constants/enums';

import { RequestParams } from './types';

export const fetchRequest = (
  url: string,
  method: Method,
  requestParams?: RequestParams,
): Promise<Response> => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method,
    ...requestParams,
  });
};

export const request = async <T>(
  url: string,
  method: Method,
  requestParams?: RequestParams,
): Promise<T> => {
  const response = await fetchRequest(url, method, requestParams);

  const result = await response.json();

  if (result?.errorCode || result?.statusCode) {
    throw new Error(result.message);
  }

  return result;
};
