import { Method } from '../app/constants';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}
