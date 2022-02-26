import { Method } from '../constants';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}

export interface RequestError {
  errorCode?: string;
  message?: string | string[];
  statusCode?: number;
}
