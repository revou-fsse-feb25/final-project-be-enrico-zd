import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsNotEmpty()
  @IsNumber()
  shift_id: number | null;
}
