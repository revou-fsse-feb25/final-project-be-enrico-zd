import {
  EmployeeType,
  StatusActive,
  UserType,
  WorkSpace,
} from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserCompanyDetailDto {
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

  @IsNotEmpty()
  @IsDate()
  leaving_date: Date;

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
}
