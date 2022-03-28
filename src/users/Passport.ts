
import moment from "moment";

import { BusinessError } from "../common/BusinessError";
import { Assertion } from "./../common/Assertion";

export class Passport extends Assertion {
	private _INVALID_DATE: string
	private _name: string
	private _expireDate: string
	private _createdAt: Date = new Date()

	constructor(name, expireDate) {
		super()
		this._INVALID_DATE = "Invalid date"
		this._name = name;
		this._expireDate = expireDate;
	}

	set name(value) {
		this.assertNotNull(value, "O name não pode ficar vazio!", "name");
		this._name = value;
	}

	get name() {
		return this._name;
	}

	set expireDate(value) {

		if (value) {
			const vencimento = moment(value, "DD/MM/YYYY");

			if (vencimento.toString() === this._INVALID_DATE) {
				throw new BusinessError({ detail: "A expireDate precisa ser uma data válida!", source: "expireDate" });
			}
			const dataAtual = new Date();
			dataAtual.setHours(dataAtual.getHours() + 1);

			this._expireDate = value;
		}
	}

	get expireDate() {
		return this._expireDate;
	}

	get createdAt() {
		return this._createdAt;
	}

	toJson() {
		return {
			name: this._name,
			dataCadastro: this._createdAt,
			expireDate: this._expireDate
		};
	}

	static fromJson({ name, expireDate, createdAt }) {
		const passaporte = new Passport(name, expireDate);
		passaporte._createdAt = createdAt;

		return passaporte;
	}
}
