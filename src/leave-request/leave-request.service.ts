import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/req/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/req/update-leave-request.dto';
import { LeaveRequestRepository } from './leave-request.repository';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { toEndOfDayUTC } from 'src/utils/end-of-day.utils';

@Injectable()
export class LeaveRequestService {
  constructor(
    private readonly leaveRequestRepository: LeaveRequestRepository,
    private readonly userCompDetailService: UserCompanyDetailService,
  ) {}

  async createLeaveRequest(data: CreateLeaveRequestDto, userId: number) {
    const { leave_type_id, from, to, reason, proof_image } = data;

    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }

    if (from > to) {
      throw new BadRequestException('end date must be after start date');
    }

    const endLeave = toEndOfDayUTC(to)

    // count requested_day
    const MS_PER_DAY = 86_400_000;
    const requested_days =
      Math.ceil(
        (Date.parse(to.toISOString()) - Date.parse(from.toISOString())) /
          MS_PER_DAY,
      ) + 1;

    return await this.leaveRequestRepository.createLeaveRequest(
      {
        leave_type_id,
        from,
        to: endLeave,
        reason,
        proof_image,
      },
      requested_days,
      userDetail.company_id,
      userId,
    );
  }

  async findAllLeaveRequestByCompanyId(userId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }

    return await this.leaveRequestRepository.findAllLeaveRequestByCompanyId(
      userDetail.company_id,
    );
  }

  async findAllLeaveRequestByType(userId: number, typeId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }

    return this.leaveRequestRepository.findAllLeaveRequestByType(
      userId,
      userDetail.company_id,
      typeId,
    );
  }

  async findAllLeaveRequestByUserId(userId: number) {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('User detail not found');
    }

    return this.leaveRequestRepository.findAllLeaveRequestByUserId(
      userId,
      userDetail.company_id,
    );
  }

  async findLeaveTypeById(id: number) {
    return this.leaveRequestRepository.findLeaveTypeById(id);
  }

  async approveLeaveRequest(
    id: number,
    userId: number,
    data: UpdateLeaveRequestDto,
  ) {
    const leaveRequestCompany =
      await this.findAllLeaveRequestByCompanyId(userId);

    const validLeaveRequest = leaveRequestCompany.some(
      (leaveReq) => leaveReq.leave_request_id === id,
    );

    if (!validLeaveRequest) {
      throw new NotFoundException(`Leave Request dengan id ${id} tidak valid`);
    }

    return this.leaveRequestRepository.approveLeaveRequest(id, userId, data);
  }
}
