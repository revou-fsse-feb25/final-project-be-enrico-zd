import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { LeaveTypeRepository } from './leave-type.repository';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';

@Injectable()
export class LeaveTypeService {
  constructor(
    private readonly leaveTypeRepository: LeaveTypeRepository,
    private readonly userCompDetailService: UserCompanyDetailService,
  ) {}

  async createLeaveType(data: CreateLeaveTypeDto, userId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }
    return await this.leaveTypeRepository.createLeaveType(
      data,
      userDetail.company_id,
    );
  }

  async findAllLeaveTypeByComapnyId(userId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }

    return await this.leaveTypeRepository.findAllLeaveTypeByCompanyId(
      userDetail.company_id,
    );
  }

  async findLeaveTypeById(id: number) {
    return this.leaveTypeRepository.findLeaveTypeById(id);
  }

  async updateLeaveType(id: number, data: UpdateLeaveTypeDto) {
    return this.leaveTypeRepository.updateLeaveType(id, data);
  }

  async deleteLeaveType(id: number) {
    return this.leaveTypeRepository.deleteLeaveType(id);
  }
}
