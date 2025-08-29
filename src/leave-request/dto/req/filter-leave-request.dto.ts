import { IsNotEmpty, IsNumber } from 'class-validator';

export class FilterLeaveRequestDto {
  @IsNotEmpty()
  @IsNumber()
  leave_type_id: number;
}
