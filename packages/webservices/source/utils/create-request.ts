import { type TranslationKey, t } from '@killerparty/intl';

/* import { toast } from 'react-hot-toast'; */

import { type Method } from '../types';

import { RequestError } from './request-error';

interface RequestParams {
  url: string;
  method: Method;
  requestInit?: RequestInit;
}

export async function createRequest<T>({
  url,
  method,
  requestInit,
}: RequestParams): Promise<T> {
  /* const token = AsyncStorage.getItem('token'); */

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      /* ...(token && { Authorization: `Bearer ${token}` }), */
    },
    credentials: 'include',
    method,
    ...requestInit,
  }).catch((error) => {
    /*     toast.error(t('errors.SERVER_ERROR')); */

    throw new Error(error.message);
  });

  // No content
  if (response.status === 204) {
    return Promise.resolve() as Promise<T>;
  }

  // Forbidden
  if (response.status === 403) {
    const errorMessage = t('errors.FORBIDDEN');

    /*     toast.error(errorMessage); */

    throw new RequestError({
      message: errorMessage,
      errorCode: 'FORBIDDEN',
    });
  }

  // Not found
  if (response.status === 404) {
    const errorMessage = t('errors.NOT_FOUND');

    /*     toast.error(errorMessage); */

    throw new RequestError({
      message: errorMessage,
      errorCode: 'NOT_FOUND',
    });
  }

  const result = await response.json();

  if (
    response.status === 401 &&
    ['INVALID_TOKEN', 'EXPIRED_TOKEN', 'TOKEN_NOT_FOUND'].includes(
      result.message,
    )
  ) {
    /* localStorage.removeItem('token'); */

    const errorMessage = t(`errors.${result.message}` as TranslationKey);

    /*     toast.error(errorMessage); */

    throw new RequestError({
      message: errorMessage,
      errorCode: result.message,
    });
  }

  if (response.status >= 400) {
    const errorMessage = t(`errors.${result?.detail}` as TranslationKey);

    /*   toast.error(errorMessage);
     */
    throw new RequestError({
      message: errorMessage,
      errorCode: result?.detail,
    });
  }

  if (result?.token) {
    /*  localStorage.setItem('token', result.token); */
  }

  return result;
}
