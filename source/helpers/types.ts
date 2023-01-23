import { Method } from '@/constants/enums';
import { RoomErrorCode } from '@/constants/errors';

export type ErrorCode = RoomErrorCode;

export interface RequestParams {
  url: string;
  method: Method;
  requestInit?: RequestInit;
}

export interface RequestErrorParams {
  errorCode: ErrorCode;
  message: string;
  statusCode: number;
}
