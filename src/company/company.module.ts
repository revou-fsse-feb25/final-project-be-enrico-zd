import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';

@Module({
  imports: [forwardRef(() => UserCompanyDetailModule), ShiftsModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService],
})
export class CompanyModule {}
