import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  //   async createCompany(data: CreateCompanyDto) {
  //     return 'This action adds a new company';
  //   }

  async findCompanyById(
    id: number,
    filter?: { is_delete: boolean },
  ): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: {
        company_id: id,
        is_delete: filter?.is_delete ?? false,
      },
    });
  }

  async findCompanyByName(
    name: string,
    filter?: { is_delete: boolean },
  ): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: {
        company_name: name,
        is_delete: filter?.is_delete ?? false,
      },
    });
  }

  async updateCompany(id: number, data: UpdateCompanyDto): Promise<Company> {
    await this.findCompanyById(id);
    return this.prisma.company.update({
      where: { company_id: id },
      data: data,
    });
  }

  async softDeleteCompany(id: number): Promise<Company> {
    await this.findCompanyById(id);
    return this.prisma.company.update({
      where: { company_id: id },
      data: {
        is_delete: true,
      },
    });
  }

  async restoreCompany(id: number): Promise<Company> {
    await this.findCompanyById(id, { is_delete: true });
    return this.prisma.company.update({
      where: { company_id: id },
      data: {
        is_delete: false,
      },
    });
  }
}
