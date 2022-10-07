import { Method } from '@/constants/enums';

export interface RequestParams {
  url: string;
  method: Method;
  requestInit?: RequestInit;
}

export interface RequestErrorParams {
  errorCode: string;
  message: string;
  statusCode: number;
}
