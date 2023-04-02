import { t } from 'i18next';
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

  if (response.status === 204) {
    return null as T;
  }

  const result = await response.json();

  if (result.status >= 400) {
    const errorMessage = result?.detail || t('errors.server.message');

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
