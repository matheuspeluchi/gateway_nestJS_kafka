import { Message } from "./Message";
export class BusinessError extends Error {
	private _errorMessage: Message

	constructor(message: Message) {
		super(message.detail);
		this._errorMessage = message;
		this.name = "NegocioError";
	}

	get errorMessage() {
		return this._errorMessage;
	}
}