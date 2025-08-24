import { Gender, Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @Matches(/^\d+$/, { message: 'NIK must be a number' })
  @IsString()
  nik: string | null;

  @IsOptional()
  @Matches(/^\d+$/, { message: 'NIK must be a number' })
  @IsString()
  family_card_number: string | null;

  @IsOptional()
  @IsString()
  employment_number: string | null;

  @IsOptional()
  @IsString()
  passport_number: string | null;

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

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date_of_birth: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

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
