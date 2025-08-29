import {
  EmployeeType,
  StatusActive,
  UserType,
  WorkSpace,
} from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CompanyResponseDTO } from 'src/company/dto/res/company.body.dto';
import { UserResponseDTO } from 'src/users/dto/res/user.body.dto';

export class UserCompanyResponseDTO {
  @Expose()
  user_company_id: number;

  @Expose()
  user_id: number;

  @Expose()
  company_id: number;

  @Expose()
  employee_type: EmployeeType;

  @Expose()
  user_type: UserType;

  @Expose()
  joining_date: Date;

  @Expose()
  leaving_date: Date;

  @Expose()
  shift_id: number;

  @Expose()
  workspace: WorkSpace;

  @Expose()
  user_status: StatusActive;

  @Expose()
  employee_username: string;

  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;

  @Expose()
  @Type(() => CompanyResponseDTO)
  company: CompanyResponseDTO;
}
