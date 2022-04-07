import { IsEmail, IsString } from 'class-validator';

export class AdminDTO {
  constructor(admin) {
    this.id = admin.id;
    this.email = admin.email;
    this.login = admin.login;
    this.name = admin.name;
  }

  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsEmail(IsEmail, { message: 'Email inválido' })
  email: string;
}
