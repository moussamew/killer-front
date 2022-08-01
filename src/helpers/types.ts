import { Method } from '@/constants/enums';

export interface RequestParams {
  method?: Method;
  body?: BodyInit;
}

export interface RequestErrorParams {
  errorCode: string;
  message: string;
  statusCode: number;
}
