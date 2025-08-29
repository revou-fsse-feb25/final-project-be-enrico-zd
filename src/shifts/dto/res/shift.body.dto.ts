import { StatusActive } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ShiftResponseDTO {
  @Expose()
  shift_id: number;

  @Expose()
  company_id: number;

  @Expose()
  title: number;

  @Expose()
  opening_time: Date;

  @Expose()
  closing_time: Date;

  @Expose()
  status: StatusActive;
}
