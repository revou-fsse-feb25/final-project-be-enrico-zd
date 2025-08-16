import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftsRepository } from './shift.repository';
import { Shift } from '@prisma/client';

@Injectable()
export class ShiftsService {
  constructor(private readonly shiftRepository: ShiftsRepository) {}

  async createShift(data: CreateShiftDto, companyId: number): Promise<Shift> {
    return this.shiftRepository.createShift(data, companyId);
  }

  async findAllShiftByCompanyId(companyId: number): Promise<Shift[]> {
    return this.shiftRepository.findAllShiftByCompanyId(companyId);
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
