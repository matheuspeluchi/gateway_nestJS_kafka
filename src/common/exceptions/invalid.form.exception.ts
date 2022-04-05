import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { Message } from './Message';

export class InvalidFormException extends BadRequestException {
  private _errors: Message[];
  private _status: number;
  constructor(errors: ValidationError[]) {
    super('EBADREQUEST');
    this._status = HttpStatus.BAD_REQUEST;
    this.parseErrors(errors);
  }

  getStatus(): number {
    return this._status;
  }
  getResponse(): string | object {
    return {
      errors: this._errors,
    };
  }

  private parseErrors(errors: ValidationError[]) {
    const errorMessages: Array<Message> = [];
    errors.forEach((error) => {
      errorMessages.push({
        source: error.property,
        detail: this.getErrorMessage(error.constraints),
      });
    });
    this._errors = errorMessages;
  }

  private getErrorMessage(constraints): string {
    return constraints[Object.keys(constraints)[0]];
  }
}
