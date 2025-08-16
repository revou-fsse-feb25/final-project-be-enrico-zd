import { Module } from '@nestjs/common';
import { UserCompanyDetailService } from './user-company-detail.service';
import { UserCompanyDetailController } from './user-company-detail.controller';
import { UserCompanyDetailRepository } from './user-company-detail.repository';
import { UsersModule } from 'src/users/users.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [UsersModule, CompanyModule],
  controllers: [UserCompanyDetailController],
  providers: [UserCompanyDetailService, UserCompanyDetailRepository],
})
export class UserCompanyDetailModule {}
