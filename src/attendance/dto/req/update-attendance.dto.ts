import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceBy, AttendanceStatus, StatusApproval } from '@prisma/client';

export class CheckInDto extends PartialType(CreateAttendanceDto) {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  check_in_at: Date;

  @IsOptional()
  @IsEnum(AttendanceStatus, {
    message: 'Status must be either PRESENT, LATE, ABSENT or LEAVE',
  })
  attendance_status: AttendanceStatus;

  @IsOptional()
  @IsEnum(AttendanceBy, {
    message: 'Attendance by must be either ADMIN or SELF',
  })
  attendance_by: AttendanceBy;

  @IsOptional()
  @IsNumber()
  late_minute: number;

  @IsOptional()
  @IsEnum(StatusApproval, {
    message: 'Attendance by must be either PENDING, APPROVED or REJECTED',
  })
  status: StatusApproval;
}

export class CheckOutDto extends PartialType(CreateAttendanceDto) {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  check_out_at: Date;

  @IsOptional()
  @IsNumber()
  hours_work_min: number;

  @IsOptional()
  @IsNumber()
  overtime_min: number;

  @IsOptional()
  @IsEnum(AttendanceBy, {
    message: 'Attendance by must be either ADMIN or SELF',
  })
  attendance_by: AttendanceBy;
}

export class resetAttendanceDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  check_in_at: Date | null;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  check_out_at: Date | null;

  @IsOptional()
  @IsEnum(AttendanceStatus, {
    message: 'Status must be either PRESENT, LATE, ABSENT or LEAVE',
  })
  attendance_status: AttendanceStatus;

  @IsOptional()
  @IsEnum(AttendanceBy, {
    message: 'Attendance by must be either ADMIN or SELF',
  })
  attendance_by: AttendanceBy | null;

  @IsOptional()
  @IsNumber()
  late_minute: number;

  @IsOptional()
  @IsNumber()
  hours_work_min: number;

  @IsOptional()
  @IsNumber()
  overtime_min: number;

  @IsOptional()
  @IsEnum(StatusApproval, {
    message: 'Attendance by must be either PENDING, APPROVED or REJECTED',
  })
  status: StatusApproval;
}
