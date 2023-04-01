import { toast } from 'react-hot-toast';

import { type RequestParams } from './types';

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
    method,
    ...requestInit,
  });

  // Early return for "204 No Content status".
  if (response.status === 204) {
    return null as T;
  }

  const result = await response.json();

  if (!response.ok) {
    toast.error(result.detail);
    return null as T;
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
