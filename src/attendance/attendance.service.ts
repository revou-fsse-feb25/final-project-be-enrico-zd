import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  CheckInDto,
  CheckOutDto,
  resetAttendanceDto,
} from './dto/req/update-attendance.dto';
import { AttendanceRepository } from './attendance.repository';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { Cron } from '@nestjs/schedule';
import { ShiftsService } from 'src/shifts/shifts.service';
import { Role } from '@prisma/client';
import { intervalTime } from 'src/utils/interval-time.utils';
import { randomUUID } from 'crypto';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly userCompDetailService: UserCompanyDetailService,
    private readonly shiftService: ShiftsService,
  ) {}

  @Cron('0 5 0 * * *', { name: randomUUID(), timeZone: 'Asia/Jakarta' })
  async createAllDefaultUserAttendance() {
    const userDetail = await this.userCompDetailService.findAllUserCom();

    return await this.attendanceRepository.createAllDefaultUserAttendance(
      userDetail,
    );
  }

  async findAllCompanyAttendance(companyId: number) {
    return this.attendanceRepository.findAllCompanyAttendance(companyId);
  }

  async findAllAttendanceByUserId(userId: number) {
    return this.attendanceRepository.findAllAttendanceByUserId(userId);
  }

  async findAllUserAttendanceHistory(userId: number) {
    return this.attendanceRepository.findAllUserAttendanceHistory(userId);
  }

  async employeeCheckIn(userId: number, role: Role, data: CheckInDto) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail?.shift_id) {
      throw new UnprocessableEntityException('user not have a shift');
    }

    const shift = await this.shiftService.findShiftById(userDetail.shift_id);

    if (!shift?.opening_time) {
      throw new UnprocessableEntityException('shift not have a opening time');
    }

    return this.attendanceRepository.employeeCheckIn(userId, {
      check_in_at: data.check_in_at,
      attendance_status: 'PRESENT',
      attendance_by: role === 'ADMIN' ? 'ADMIN' : 'SELF',
      late_minute: intervalTime(shift?.opening_time, data.check_in_at),
      status: 'APPROVED',
    });
  }

  async employeeCheckOut(userId: number, role: Role, data: CheckOutDto) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail?.shift_id) {
      throw new UnprocessableEntityException('user not have a shift');
    }

    const shift = await this.shiftService.findShiftById(userDetail.shift_id);

    if (!shift?.closing_time) {
      throw new UnprocessableEntityException('shift not have a opening time');
    }

    const attendance =
      await this.attendanceRepository.findAttendanceTodayByUserId(userId);

    if (!attendance?.check_in_at) {
      throw new UnprocessableEntityException('no check in record for today');
    }

    return this.attendanceRepository.employeeCheckOut(userId, {
      check_out_at: data.check_out_at,
      hours_work_min: intervalTime(attendance.check_in_at, data.check_out_at),
      overtime_min: intervalTime(shift.closing_time, data.check_out_at),
      attendance_by: role === 'ADMIN' ? 'ADMIN' : 'SELF',
    });
  }

  async resetAttendance(id: number) {
    const resetData: resetAttendanceDto = {
      check_in_at: null,
      check_out_at: null,
      attendance_status: 'ABSENT',
      attendance_by: null,
      late_minute: 0,
      hours_work_min: 0,
      overtime_min: 0,
      status: 'PENDING',
    };

    return await this.attendanceRepository.resetAttendance(id, resetData);
  }
}
