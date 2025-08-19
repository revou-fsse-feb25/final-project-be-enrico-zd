import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  company_owner: string;

  @IsNotEmpty()
  @IsString()
  company_address: string;

  @IsNotEmpty()
  @IsString()
  company_email: string;

  @IsNotEmpty()
  @IsString()
  company_phone: string;
}
