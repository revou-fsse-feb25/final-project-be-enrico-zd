import { PartialType } from '@nestjs/mapped-types';
import { createEmployeeDto } from './create-user-company-detail.dto';
import { Type } from 'class-transformer';
import { UpdateUserDto } from 'src/users/dto/req/update-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(createEmployeeDto) {}

export class UpdateUserCompanyDetailDto {
  @IsNotEmpty()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;

  @IsNotEmpty()
  @Type(() => UpdateEmployeeDto)
  employee: UpdateEmployeeDto;
}
