import {
  EmployeeType,
  StatusActive,
  UserType,
  WorkSpace,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/req/create-user.dto';

export class createEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsNotEmpty()
  @IsEnum(EmployeeType, {
    message: 'Employee type must be either CONTRACT, PERMANENT or TEMPORARY',
  })
  employee_type: EmployeeType;

  @IsNotEmpty()
  @IsEnum(UserType, { message: 'User type must be either FIELD or NONFIELD' })
  user_type: UserType;

  @IsNotEmpty()
  @IsDate()
  joining_date: Date;

  @IsOptional()
  @IsDate()
  leaving_date: Date | null;

  @IsNotEmpty()
  @IsNumber()
  shift_id: number;

  @IsNotEmpty()
  @IsEnum(WorkSpace, { message: 'User type must be either HOME or OFFICE' })
  workspace: WorkSpace;

  @IsNotEmpty()
  @IsEnum(StatusActive, {
    message: 'User type must be either ACTIVE or INACTIVE',
  })
  user_status: StatusActive;

  @IsNotEmpty()
  @IsString()
  employee_username: string;
}

export class CreateUserCompanyDetailDto {
  @IsNotEmpty()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsNotEmpty()
  @Type(() => createEmployeeDto)
  employee: createEmployeeDto;
}
