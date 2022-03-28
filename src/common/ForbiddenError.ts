import { Message } from "./Message";

export class ForbiddenError extends Error {
	private _errorMessage: Message

	constructor(message: Message) {
		super(message.detail);
		this._errorMessage = message;
		this.name = "ForbiddenError";
	}

	get errorMessage() {
		return this._errorMessage;
	}
}