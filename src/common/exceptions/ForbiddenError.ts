import { HttpStatus } from '@nestjs/common';
import { Message } from './Message';

export class ForbiddenError extends Error {
  private _status: number;
  private _errors: Array<Message>;

  constructor(message: Message) {
    super(message.detail);
    this.name = 'EFORBIDDEN';
    this._status = HttpStatus.FORBIDDEN;
    this._errors.push(message);
  }

  getError() {
    return { errors: this._errors };
  }

  get status() {
    return this._status;
  }
}
