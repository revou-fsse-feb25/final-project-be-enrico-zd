import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsNotEmpty()
  @IsNumber()
  leave_type_id: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  from: Date;
  
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  to: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsString()
  proof_image: string;
}
