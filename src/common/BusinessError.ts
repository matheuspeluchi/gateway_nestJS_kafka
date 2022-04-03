import { Message } from "./Message";
export class BusinessError extends Error {
  private _errorMessage: Message;
  private _status: number;

  constructor(message: Message) {
    super(message.detail);
    this._errorMessage = message;
    this.name = "BusinessError";
    this._status = 412;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get status() {
    return this._status;
  }
}
