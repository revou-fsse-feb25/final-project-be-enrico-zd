import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/req/create-attendance.dto';
import {
  CheckInDto,
  CheckOutDto,
  resetAttendanceDto,
} from './dto/req/update-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAllDefaultUserAttendance(data: CreateAttendanceDto[]) {
    const now = new Date();
    return this.prisma.attendance.createManyAndReturn({
      data: data.map((d) => ({
        ...d,
        attendance_date: new Date(now.getTime() + 7 * 60 * 60 * 1000),
      })),
      skipDuplicates: true,
      select: {
        attendance_id: true,
        user_id: true,
        company_id: true,
        attendance_date: true,
      },
    });
  }

  async findAllCompanyAttendance(companyId: number) {
    const now = new Date();
    return this.prisma.attendance.findMany({
      where: {
        company_id: companyId,
        attendance_date: new Date(now.getTime() + 7 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });
  }

  async findAllAttendanceByUserId(userId: number) {
    return this.prisma.attendance.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async findAllUserAttendanceHistory(userId: number) {
    return this.prisma.attendance.findMany({
      where: {
        user_id: userId,
        NOT: {
          attendance_status: 'ABSENT',
        },
      },
    });
  }

  async findAttendanceTodayByUserId(userId: number) {
    return this.prisma.attendance.findFirst({
      where: {
        AND: [{ user_id: userId }, { attendance_date: new Date() }],
      },
    });
  }

  async employeeCheckIn(userId: number, data: CheckInDto) {
    const attendance = await this.findAttendanceTodayByUserId(userId);
    if (!attendance) {
      console.log(`tidak ada attendance`);
    }
    return this.prisma.attendance.update({
      where: {
        attendance_id: attendance?.attendance_id,
      },
      data,
    });
  }

  async employeeCheckOut(userId: number, data: CheckOutDto) {
    const attendance = await this.findAttendanceTodayByUserId(userId);
    return this.prisma.attendance.update({
      where: {
        attendance_id: attendance?.attendance_id,
      },
      data,
    });
  }

  async resetAttendance(id: number, data: resetAttendanceDto) {
    return this.prisma.attendance.update({
      where: {
        attendance_id: id,
      },
      data,
    });
  }
}
