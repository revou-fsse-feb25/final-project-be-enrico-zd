import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from './attendance.repository';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';
import { ShiftsModule } from 'src/shifts/shifts.module';

@Module({
  imports: [UserCompanyDetailModule, ShiftsModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository],
})
export class AttendanceModule {}
