import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { UserCompanyDetailModule } from './user-company-detail/user-company-detail.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';

@Module({
  imports: [PrismaModule, UsersModule, CompanyModule, UserCompanyDetailModule, ShiftsModule, AttendanceModule, LeaveTypeModule, LeaveRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
