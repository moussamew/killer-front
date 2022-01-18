import { RequestParams } from './types';

const request = async <T>(
  url: string,
  requestParams?: RequestParams,
): Promise<T> =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: requestParams?.method,
    body: requestParams?.body,
  }).then((res) => res.json());

export { request };
