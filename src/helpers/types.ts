import { Method } from '../app/constants';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}

export interface RequestError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}
