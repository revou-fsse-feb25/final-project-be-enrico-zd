import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftDto } from './create-shift.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusActive } from '@prisma/client';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {
  @IsNotEmpty()
  @IsEnum(StatusActive, { message: 'Status must be either ACTIVE or INACTIVE' })
  status: StatusActive;
}
