import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsOptional()
  id: string;

  @IsString()
  login: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsEmail(IsEmail, { message: 'Email inválido' })
  email: string;
}
