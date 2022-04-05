import { HttpStatus } from '@nestjs/common';
import { Message } from './Message';

export class BadRequestError extends Error {
  private _status: number;
  private _errors: Array<Message>;

  constructor(message: Message) {
    super(message.detail);
    this.name = 'EBADREQUEST';
    this._status = HttpStatus.BAD_REQUEST;
    this._errors.push(message);
  }

  get status() {
    return this._status;
  }

  getError() {
    return this._errors;
  }
}
