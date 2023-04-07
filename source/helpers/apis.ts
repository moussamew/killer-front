import { t } from 'i18next';
import { toast } from 'react-hot-toast';

import { ErrorCode } from '@/constants/errors';

import { type RequestParams } from './types';

const { SERVER_ERROR, INVALID_TOKEN, EXPIRED_TOKEN } = ErrorCode;

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
    toast.error(t(`errors.${SERVER_ERROR}`));

    throw new Error(error.message);
  });

  if (response.status === 204) {
    return null as T;
  }

  const result = await response.json();

  if (
    result.code === 401 &&
    [INVALID_TOKEN, EXPIRED_TOKEN].includes(result.message)
  ) {
    localStorage.removeItem('token');
    const errorMessage = t(`errors.${result.message}`);

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (result.status >= 400) {
    const errorMessage = t(`errors.${result?.detail}`);

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
