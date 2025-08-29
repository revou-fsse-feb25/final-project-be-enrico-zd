import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftDto } from './dto/req/create-shift.dto';
import { UpdateShiftDto } from './dto/req/update-shift.dto';
import { ShiftsRepository } from './shift.repository';
import { Shift } from '@prisma/client';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';
import { ShiftNotFoundRepositoryException } from 'src/common/exceptions/shift-not-found.exception.repository';

@Injectable()
export class ShiftsService {
  constructor(
    private readonly shiftRepository: ShiftsRepository,
    @Inject(forwardRef(() => UserCompanyDetailService))
    private readonly userCompDetailService: UserCompanyDetailService,
  ) {}

  async createShift(data: CreateShiftDto, userId: number): Promise<Shift> {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    try {
      return this.shiftRepository.createShift(data, userDetail.company_id);
    } catch {
      throw new BadRequestException('Failed to create shift');
    }
  }

  async createShiftDefault(
    data: CreateShiftDto,
    companyId: number,
  ): Promise<Shift> {
    try {
      return this.shiftRepository.createShift(data, companyId);
    } catch {
      throw new BadRequestException('Failed to create shift default');
    }
  }

  async findAllShiftByCompanyId(userId: number): Promise<Shift[]> {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const shift = await this.shiftRepository.findAllShiftByCompanyId(
      userDetail.company_id,
    );

    if (!shift) {
      throw new ShiftNotFoundRepositoryException();
    }
    return shift;
  }

  async findShiftById(id: number): Promise<Shift | null> {
    const shift = await this.shiftRepository.findShiftById(id);

    if (!shift) {
      throw new ShiftNotFoundRepositoryException();
    }
    return shift;
  }

  async updateShift(id: number, data: UpdateShiftDto) {
    try {
      return this.shiftRepository.updateShift(id, data);
    } catch {
      throw new BadRequestException('Failed to update shift');
    }
  }

  async deleteShift(id: number) {
    try {
      return this.shiftRepository.deleteShift(id);
    } catch {
      throw new BadRequestException('Failed to delete shift');
    }
  }
}
