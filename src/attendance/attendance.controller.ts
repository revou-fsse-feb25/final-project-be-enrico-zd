import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto, CheckOutDto } from './dto/req/update-attendance.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @Roles('ADMIN')
  async findAllCompanyAttendance(
    @Query('company_id', ParseIntPipe) companyId: number,
  ) {
    return this.attendanceService.findAllCompanyAttendance(companyId);
  }

  @Get('/employee')
  @Roles('ADMIN')
  async findAllAttendanceByUserId(
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.attendanceService.findAllAttendanceByUserId(userId);
  }

  @Get('/history')
  async findAllUserAttendanceHistory(@CurrentUser() user: User) {
    return this.attendanceService.findAllUserAttendanceHistory(user.user_id);
  }

  @Patch('checkin/:id')
  async employeeCheckIn(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CheckInDto,
    @CurrentUser() user: User,
  ) {
    return this.attendanceService.employeeCheckIn(id, user.role, data);
  }

  @Patch('checkout/:id')
  async employeeCheckOut(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CheckOutDto,
    @CurrentUser() user: User,
  ) {
    return this.attendanceService.employeeCheckOut(id, user.role, data);
  }

  @Patch('reset/:id')
  @Roles('ADMIN')
  async resetAttendance(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.resetAttendance(id)
  }
}
