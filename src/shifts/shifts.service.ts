import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftsRepository } from './shift.repository';
import { Shift } from '@prisma/client';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';

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
      throw new NotFoundException('user detail not found');
    }

    return this.shiftRepository.createShift(data, userDetail.company_id);
  }

  async createShiftDefault(
    data: CreateShiftDto,
    companyId: number,
  ): Promise<Shift> {
    return this.shiftRepository.createShift(data, companyId);
  }

  async findAllShiftByCompanyId(userId: number): Promise<Shift[]> {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('user detail not found');
    }

    return this.shiftRepository.findAllShiftByCompanyId(userDetail.company_id);
  }

  async findShiftById(id: number): Promise<Shift | null> {
    return this.shiftRepository.findShiftById(id);
  }

  async updateShift(id: number, data: UpdateShiftDto) {
    return this.shiftRepository.updateShift(id, data);
  }

  async deleteShift(id: number) {
    return this.shiftRepository.deleteShift(id);
  }
}
