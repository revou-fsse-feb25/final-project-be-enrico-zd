import { Expose } from 'class-transformer';

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
  attendance_status: Date;

  @Expose()
  attendance_by: Date;

  @Expose()
  hours_work_min: Date;

  @Expose()
  late_minute: Date;

  @Expose()
  overtime_min: Date;

  @Expose()
  status: Date;
}
