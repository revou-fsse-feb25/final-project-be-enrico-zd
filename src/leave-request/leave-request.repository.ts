import { Injectable } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaveRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLeaveRequest(
    data: CreateLeaveRequestDto,
    requested_days: number,
    companyId: number,
    userId: number,
  ) {
    const { leave_type_id, from, to, reason, proof_image } = data;
    return this.prisma.leaveRequest.create({
      data: {
        leave_type_id,
        from,
        to,
        reason,
        proof_image,
        requested_days,
        company_id: companyId,
        user_id: userId,
      },
    });
  }

  async findAllLeaveRequestByCompanyId(companyId: number) {
    return this.prisma.leaveRequest.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        user: true,
        approver: true,
        type: true,
      },
    });
  }

  async findAllLeaveRequestByType(
    userId: number,
    companyId: number,
    typeId: number,
  ) {
    return this.prisma.leaveRequest.findMany({
      where: {
        company_id: companyId,
        user_id: userId,
        leave_type_id: typeId,
      },
      include: {
        approver: true,
        type: true,
      },
    });
  }

  async findAllLeaveRequestByUserId(userId: number, companyId: number) {
    return this.prisma.leaveRequest.findMany({
      where: {
        company_id: companyId,
        user_id: userId,
      },
    });
  }

  async findLeaveTypeById(id: number) {
    return this.prisma.leaveRequest.findUnique({
      where: {
        leave_request_id: id,
      },
    });
  }

  async approveLeaveRequest(
    id: number,
    userId: number,
    data: UpdateLeaveRequestDto,
  ) {
    await this.findLeaveTypeById(id);
    return this.prisma.leaveRequest.update({
      where: {
        leave_request_id: id,
      },
      data: {
        ...data,
        approved_by: data.status === 'REJECTED' ? null : userId,
        approved_at: data.status === 'REJECTED' ? null : new Date(),
      },
    });
  }
}
