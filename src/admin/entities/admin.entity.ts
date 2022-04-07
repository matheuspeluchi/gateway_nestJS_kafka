import { AdminDTO } from '../dto/admin.dto';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminDocument } from '../schemas/admin.schema';

export class AdminEntity {
  private _id: string = null;
  private _name: string;
  private _login: string;
  private _email: string;

  constructor(admin: AdminDTO | CreateAdminDto) {
    this._login = admin.login;
    this._email = admin.email;
    this._name = admin.name;
    this._id = admin.id;
  }

  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get login() {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      login: this.login,
      email: this.email,
    };
  }

  toAdminDTO(): AdminDTO {
    const admin = new AdminDTO({
      login: this.login,
      name: this.name,
      email: this.email,
    });
    if (this._id) admin.id = this._id;
    return admin;
  }

  static fromJson(admin: AdminDocument): AdminEntity {
    return new AdminEntity({
      id: admin._id.toString(),
      email: admin.email,
      login: admin.login,
      name: admin.name,
    });
  }
}
