import { RequestError } from './errors';
import { RequestParams } from './types';

export async function request<T>({
  url,
  method,
  requestInit,
}: RequestParams): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
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

  return result;
}
