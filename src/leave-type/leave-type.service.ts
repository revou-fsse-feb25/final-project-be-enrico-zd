import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/req/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/req/update-leave-type.dto';
import { LeaveTypeRepository } from './leave-type.repository';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';
import { LeaveTypeNotFoundRepositoryException } from 'src/common/exceptions/leave-type-not-found.exception.repository';

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
      throw new UserCompanyNotFoundRepositoryException();
    }

    try {
      return await this.leaveTypeRepository.createLeaveType(
        data,
        userDetail.company_id,
      );
    } catch {
      throw new BadRequestException('Failed to create leave type');
    }
  }

  async findAllLeaveTypeByComapnyId(userId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const leaveType =
      await this.leaveTypeRepository.findAllLeaveTypeByCompanyId(
        userDetail.company_id,
      );

    return leaveType;
  }

  async findLeaveTypeById(id: number) {
    const leaveType = await this.leaveTypeRepository.findLeaveTypeById(id);

    if (!leaveType) {
      throw new LeaveTypeNotFoundRepositoryException();
    }

    return leaveType;
  }

  async updateLeaveType(id: number, data: UpdateLeaveTypeDto) {
    try {
      return this.leaveTypeRepository.updateLeaveType(id, data);
    } catch {
      throw new BadRequestException('Failed to update leave type');
    }
  }

  async deleteLeaveType(id: number) {
    try {
      return this.leaveTypeRepository.deleteLeaveType(id);
    } catch {
      throw new BadRequestException('Failed to update leave type');
    }
  }
}
