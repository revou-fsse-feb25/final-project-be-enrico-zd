import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCompanyDetailDto } from './create-user-company-detail.dto';

export class UpdateUserCompanyDetailDto extends PartialType(
  CreateUserCompanyDetailDto,
) {}
