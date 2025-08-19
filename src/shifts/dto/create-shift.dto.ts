import { StatusActive } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  opening_time: Date;
  
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  closing_time: Date;

  @IsNotEmpty()
  @IsEnum(StatusActive, { message: 'status must be either ACTIVE or INACTIVE' })
  status: StatusActive;
}
