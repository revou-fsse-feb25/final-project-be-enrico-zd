import { Injectable } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaveType } from '@prisma/client';

@Injectable()
export class LeaveTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLeaveType(
    data: CreateLeaveTypeDto,
    companyId: number,
  ): Promise<LeaveType> {
    const { leave_type_name, paid_leave, leave_allocated_day } = data;
    return this.prisma.leaveType.create({
      data: {
        company_id: companyId,
        leave_type_name, 
        paid_leave,
        leave_allocated_day,
      },
    });
  }

  async findAllLeaveTypeByCompanyId(companyId: number) {
    return this.prisma.leaveType.findMany({
      where: {
        company_id: companyId,
      },
    });
  }

  async findLeaveTypeById(id: number) {
    return this.prisma.leaveType.findUnique({
      where: {
        leave_type_id: id,
      },
    });
  }

  async updateLeaveType(id: number, data: UpdateLeaveTypeDto) {
    await this.findLeaveTypeById(id);
    return this.prisma.leaveType.update({
      where: { leave_type_id: id },
      data: data,
    });
  }

  async deleteLeaveType(id: number) {
    await this.findLeaveTypeById(id);
    return this.prisma.leaveType.delete({
      where: { leave_type_id: id },
    });
  }
}
