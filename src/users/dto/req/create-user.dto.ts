import { Gender, Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Matches(/^\d+$/, { message: 'NIK must be a number' })
  @IsString()
  nik: string;

  @Matches(/^\d+$/, { message: 'NIK must be a number' })
  @IsString()
  family_card_number: string;

  @IsString()
  employment_number: string;

  @IsString()
  passport_number: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsEnum(Gender, { message: 'Gender must be either MALE or FEMALE' })
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either CUSTOMER or ADMIN' })
  role?: Role;
}
