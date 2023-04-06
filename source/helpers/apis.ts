import { t } from 'i18next';
import { toast } from 'react-hot-toast';

import { TokenErrorCode } from '@/constants/errors';

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
    credentials: 'include',
    method,
    ...requestInit,
  }).catch((error) => {
    toast.error(t('errors.server.message'));

    throw new Error(error.message);
  });

  if (response.status === 204) {
    return null as T;
  }

  const result = await response.json();

  if (result.code === 401 && result.message === TokenErrorCode.INVALID_TOKEN) {
    localStorage.removeItem('token');

    toast.error(t('errors.token.invalid'));
    throw new Error(t('errors.token.invalid'));
  }

  if (result.status >= 400) {
    toast.error(result?.detail);
    throw new Error(result?.detail);
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
