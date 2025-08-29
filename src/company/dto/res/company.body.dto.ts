import { Holiday, StatusActive } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CompanyResponseDTO {
  @Expose()
  company_id: number;

  @Expose()
  company_name: string;

  @Expose()
  company_owner: string;

  @Expose()
  company_address: string;

  @Expose()
  company_email: string;

  @Expose()
  company_phone: string;

  @Expose()
  web_url: string;

  @Expose()
  npwp: string;

  @Expose()
  payroll_date: number;

  @Expose()
  status: StatusActive;

  @Expose()
  general_holiday: Holiday;

  @Expose()
  image_company: string;

  @Expose()
  is_delete: boolean;
}
