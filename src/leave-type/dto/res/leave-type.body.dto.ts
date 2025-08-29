import { PaidLeave } from '@prisma/client';
import { Expose } from 'class-transformer';

export class LeaveTypeResponseDTO {
  @Expose()
  leave_type_id: number;

  @Expose()
  company_id: number;

  @Expose()
  leave_type_name: string;

  @Expose()
  paid_leave: PaidLeave;

  @Expose()
  leave_allocated_day: number;
}
