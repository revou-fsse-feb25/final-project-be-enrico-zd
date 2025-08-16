import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  opening_time: Date;

  @IsNotEmpty()
  @IsDate()
  closing_time: Date;
}
