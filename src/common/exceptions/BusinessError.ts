import { HttpStatus } from '@nestjs/common';
import { Message } from './Message';
export class BusinessError extends Error {
  private _status: number;
  private _errors: Array<Message>;

  constructor(message: Message) {
    super(message.detail);
    this.name = 'BusinessError';
    this._status = HttpStatus.PRECONDITION_FAILED;
    this._errors.push(message);
  }

  get errorMessage() {
    return { errors: this._errors };
  }

  get status() {
    return this._status;
  }
}
