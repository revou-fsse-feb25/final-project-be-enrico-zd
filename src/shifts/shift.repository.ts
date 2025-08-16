import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Shift } from '@prisma/client';

@Injectable()
export class ShiftsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createShift(data: CreateShiftDto, companyId: number): Promise<Shift> {
    return this.prisma.shift.create({
      data: {
        ...data,
        company_id: companyId,
      },
    });
  }

  async findAllShiftByCompanyId(CompanyId: number): Promise<Shift[]> {
    return this.prisma.shift.findMany({
      where: {
        company_id: CompanyId,
      },
    });
  }

  async findShiftById(id: number): Promise<Shift | null> {
    return this.prisma.shift.findUnique({
      where: {
        shift_id: id,
      },
    });
  }

  async updateShift(id: number, data: UpdateShiftDto) {
    await this.findShiftById(id);
    return this.prisma.shift.update({
      where: {
        shift_id: id,
      },
      data: data,
    });
  }

  async deleteShift(id: number) {
    await this.findShiftById(id);
    return this.prisma.shift.delete({
      where: {
        shift_id: id,
      },
    });
  }
}
