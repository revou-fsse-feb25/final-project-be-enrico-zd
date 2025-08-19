import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequestController } from './leave-request.controller';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';
import { LeaveRequestRepository } from './leave-request.repository';

@Module({
  imports: [UserCompanyDetailModule],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, LeaveRequestRepository],
})
export class LeaveRequestModule {}
