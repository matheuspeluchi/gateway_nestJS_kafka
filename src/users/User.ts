import { Assertion } from "src/common/Assertion";
import { Historic } from "./Historic";
import { Passport } from "./Passport";

export class User extends Assertion {


	private _id: string;
	private _name: string;
	private _login: string;
	private _cpf: string;
	private _domain: string;
	private _password: string;
	private _authenticationType: string;
	private _passports: Array<Passport>;
	private _historic: Array<Historic> = []
	private _passwordLength: number;
	private _createdAt: Date;
	private _active: boolean;
	private _userDomain: string;

	constructor({
		id, name, login, cpf,
		domain,
		authenticationType }) {
		super()

		this._id = id;
		this._name = name;
		this._login = login;
		this._cpf = cpf;
		this._domain = domain;
		this._authenticationType = authenticationType;
		this._passports = [];
		this._historic = [];
		this._active = false;
		this._passwordLength = 0;
		this._createdAt = new Date();
	}

	set id(value) {
		this.assertNotNull(value, "O id não pode ficar vazio!", "id");
		this._id = value;
	}
	get id() {
		return this._id;
	}

	set name(value) {
		this.assertNotNull(value, "O name não pode ficar vazio!", "name");
		this._name = value;
	}
	get name() {
		return this._name;
	}

	set login(value) {
		this.assertNotNull(value, "O login não pode ficar vazio!", "login");
		this._login = value;
	}

	get login() {
		return this._login;
	}

	set cpf(value) {
		this.assertNotNull(value, "O cpf não pode ficar vazio!", "cpf");
		this._cpf = value;
	}

	get cpf() {
		return this._cpf;
	}

	set active(value) {
		this._active = value;
	}

	get active() {
		return this._active;
	}

	set domain(value) {
		this.assertNotNull(value, "O domain não pode ficar vazio!", "domain");
		this._domain = value;
	}

	get domain() {
		return this._domain;
	}

	get userDomain() {
		return this.login + this.domain;
	}

	set authenticationType(value) {
		this.assertNotNull(value, "A forma de autenticação não pode ficar vazio!", "authenticationType");
		this._authenticationType = value;
	}

	get authenticationType() {
		return this._authenticationType;
	}

	set password(value) {
		this.assertNotNull(value, "A senha não pode ficar vazia!", "password");
		this.assertInterval(value.length, 6, 20, "O tamanho da senha deve ser entre 6 e 20 caracteres!", "password.length");
		this._password = value;
		this._passwordLength = value.length;
	}

	get password() {
		return this._password;
	}

	get passport() {
		return this._passports;
	}

	set passwordLength(value) {
		this._passwordLength = value;
	}

	get passwordLength() {
		return this._passwordLength;
	}

	set createdAt(value) {
		this._createdAt = value;
	}
	get createdAt() {
		return this._createdAt;
	}


	addHistoric(information, admin) {
		this._historic.push({
			createdAt: new Date(),
			information,
			admin
		});
	}

	addPassport(passport) {
		this.assertNotNull(passport, "O passaporte não pode ser nulo!", "passport");
		this.assertNotEmpty(passport, "O passaporte não pode ser vazio!", "passport");

		for (let i = 0; i < passport.length; i++) {
			this.assertTrue(passport[i] instanceof Passport,
				`O passaporte na posição ${i + 1} não é válido!`, `passport[${i}]`);
		}

		this._passports.push(...passport);
	}

	removePassport(passport = []) {
		this._passports = this._passports.filter(item => !passport.includes(item.name));
	}

	toJson() {
		return {
			id: this._id,
			name: this._name,
			login: this._login,
			password: this._password,
			passwordLength: this._passwordLength,
			cpf: this._cpf,
			createdAt: this._createdAt,
			active: this._active,
			domain: this._domain,
			userDomain: this._userDomain,
			authenticationType: this._authenticationType,
			passport: this._passports.map(pass => pass.toJson()),
			historic: this._historic
		};
	}

	static fromJson({
		id,
		name,
		login,
		cpf,
		active,
		domain,
		authenticationType,
		password,
		createdAt,
		passwordLength,
		passport = [],
		historic = []
	}) {

		const user = new User({
			id,
			name,
			login,
			cpf,
			domain,
			authenticationType
		});
		user.password = password;
		user.passwordLength = passwordLength;
		user.active = active;
		user.createdAt = createdAt;

		user._historic = historic;
		const lista = [];
		passport.forEach(passaporte => {
			lista.push(Passport.fromJson(passaporte));
		});
		user._passports = lista;

		return user;
	}
}