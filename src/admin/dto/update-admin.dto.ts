import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsString()
  login: string;

  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsEmail(IsEmail, { message: 'Email inválido' })
  email: string;
}
