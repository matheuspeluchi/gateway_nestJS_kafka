import { Message } from "./Message";

export class NotFoundError extends Error {

	private _errorMessage: Message;

	constructor(message: Message) {
		super(message.detail);
		this._errorMessage = message;
		this.name = "NotFoundError";
	}

	get errorMessage() {
		return this._errorMessage;
	}

}