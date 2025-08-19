import { Module } from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { LeaveTypeController } from './leave-type.controller';
import { LeaveTypeRepository } from './leave-type.repository';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';

@Module({
  imports: [UserCompanyDetailModule],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService, LeaveTypeRepository],
})
export class LeaveTypeModule {}
