import { Module, forwardRef } from '@nestjs/common';
import { UserCompanyDetailService } from './user-company-detail.service';
import { UserCompanyDetailController } from './user-company-detail.controller';
import { UserCompanyDetailRepository } from './user-company-detail.repository';
import { UsersModule } from 'src/users/users.module';
import { CompanyModule } from 'src/company/company.module';
import { ShiftsModule } from 'src/shifts/shifts.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => ShiftsModule),
  ],
  controllers: [UserCompanyDetailController],
  providers: [UserCompanyDetailService, UserCompanyDetailRepository],
  exports: [UserCompanyDetailService],
})
export class UserCompanyDetailModule {}
