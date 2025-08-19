import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveRequestDto } from './create-leave-request.dto';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusApproval } from '@prisma/client';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {
  @IsOptional()
  @IsEnum(StatusApproval, {
    message: 'Leave status must be either PENDING, APPROVED, or REJECTED',
  })
  status: StatusApproval;

  @IsOptional()
  @IsNumber()
  approved_by: number;

  @IsOptional()
  @IsDate()
  approved_at: Date;

  @IsOptional()
  @IsString()
  admin_remark: string;
}
