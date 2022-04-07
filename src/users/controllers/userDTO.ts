import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  login: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsEmail(IsEmail, { message: 'Email inválido' })
  email: string;
}
