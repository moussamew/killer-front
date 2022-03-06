import { Method } from '../constants';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}
