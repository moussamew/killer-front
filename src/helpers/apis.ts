import { RequestError } from './errors';
import { RequestParams } from './types';

export async function request<T>({
  url,
  method,
  requestInit,
}: RequestParams): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include',
    method,
    ...requestInit,
  });

  const result = await response.json().catch(() => {
    // eslint-disable-next-line no-console
    console.error(`${method} > ${url} does not have JSON response format.`);
  });

  if (result?.errorCode) {
    throw new RequestError(result);
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
