import { PaidLeave } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty()
  @IsString()
  leave_type_name: string;

  @IsNotEmpty()
  @IsEnum(PaidLeave, { message: 'choose either YES or NO' })
  paid_leave: PaidLeave;

  @IsOptional()
  @IsNumber()
  leave_allocated_day?: number;
}
