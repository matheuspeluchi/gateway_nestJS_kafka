import { Document } from "mongoose";
import { HistoricDTO } from "./HistoricDTO";
import { PassportDTO } from "./PassportDTO";

export interface UserDTO extends Document {
	id: string
	_id: string
	name: string
	login: string
	cpf: string
	domain: string
	authenticationType: string
	passports: Array<PassportDTO>
	historic: Array<HistoricDTO>
	active: string
	passwordLength: number
	createdAt: Date
}