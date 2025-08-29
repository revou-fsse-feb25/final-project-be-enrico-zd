import { StatusApproval } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CompanyResponseDTO } from 'src/company/dto/res/company.body.dto';
import { LeaveTypeResponseDTO } from 'src/leave-type/dto/res/leave-type.body.dto';
import { UserResponseDTO } from 'src/users/dto/res/user.body.dto';

export class LeaveRequestResponseDTO {
  @Expose()
  leave_request_id: number;

  @Expose()
  company_id: number;

  @Expose()
  leave_type_id: number;

  @Expose()
  user_id: number;

  @Expose()
  reason: string;

  @Expose()
  proof_image: string;

  @Expose()
  from: Date;

  @Expose()
  to: Date;

  @Expose()
  request_date: Date;

  @Expose()
  requested_days: number;

  @Expose()
  status: StatusApproval;

  @Expose()
  approved_by: number;

  @Expose()
  approved_at: Date;

  @Expose()
  admin_remark: string;

  @Expose()
  @Type(() => CompanyResponseDTO)
  company: CompanyResponseDTO;

  @Expose()
  @Type(() => LeaveTypeResponseDTO)
  type: LeaveTypeResponseDTO;
  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;

  @Expose()
  @Type(() => UserResponseDTO)
  approver: UserResponseDTO;
}
