import { RequestErrorParams } from './types';

export class RequestError extends Error {
  readonly errorCode: string;

  readonly statusCode: number;

  constructor({ errorCode, message, statusCode }: RequestErrorParams) {
    super(message);

    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
