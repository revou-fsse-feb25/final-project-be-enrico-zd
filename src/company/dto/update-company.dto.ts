import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { Holiday, StatusActive } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @IsString()
  company_address?: string;

  @IsOptional()
  @IsString()
  web_url?: string;

  @IsOptional()
  @IsString()
  npwp?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  payroll_date?: number;

  @IsOptional()
  @IsEnum(StatusActive, { message: 'Status must be either ACTIVE or INACTIVE' })
  status?: StatusActive;

  @IsOptional()
  @IsEnum(Holiday, { message: 'Holiday must be a day from SUNDAY to SATURDAY' })
  general_holiday?: Holiday;

  @IsOptional()
  @IsString()
  image_company: string;
}
