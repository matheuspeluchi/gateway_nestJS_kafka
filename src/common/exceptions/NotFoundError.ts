import { HttpStatus } from '@nestjs/common';
import { Message } from './Message';

export class NotFoundError extends Error {
  private _status: number;
  private _errors: Array<Message>;

  constructor(message: Message) {
    super(message.detail);
    this.name = 'ENOTFOUND';
    this._status = HttpStatus.PRECONDITION_FAILED;
    this._errors.push(message);
  }

  getError() {
    return { errors: this._errors };
  }

  get status() {
    return this._status;
  }
}
