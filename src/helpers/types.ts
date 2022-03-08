import { Method } from 'constants/enums';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}
