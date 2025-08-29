import { AttendanceBy, AttendanceStatus, StatusApproval } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CompanyResponseDTO } from 'src/company/dto/res/company.body.dto';
import { ShiftResponseDTO } from 'src/shifts/dto/res/shift.body.dto';
import { UserResponseDTO } from 'src/users/dto/res/user.body.dto';

export class AttendanceResponseDto {
  @Expose()
  attendance_id: number;

  @Expose()
  user_id: number;

  @Expose()
  company_id: number;

  @Expose()
  shift_id: number;

  @Expose()
  attendance_date: Date;

  @Expose()
  check_in_at: Date;

  @Expose()
  check_out_at: Date;

  @Expose()
  attendance_status: AttendanceStatus;

  @Expose()
  attendance_by: AttendanceBy;

  @Expose()
  hours_work_min: number;

  @Expose()
  late_minute: number;

  @Expose()
  overtime_min: number;

  @Expose()
  status: StatusApproval;

  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;

  @Expose()
  @Type(() => CompanyResponseDTO)
  company: CompanyResponseDTO;

  @Expose()
  @Type(() => ShiftResponseDTO)
  shift: ShiftResponseDTO;
}
