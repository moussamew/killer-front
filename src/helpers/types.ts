import { Method } from '../constants';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}

export interface RequestError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}
