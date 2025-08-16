import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  // create(createCompanyDto: CreateCompanyDto) {
  //   return 'This action adds a new company';
  // }

  async findCompanyById(id: number): Promise<Company | null> {
    return this.companyRepository.findCompanyById(id);
  }
  
  async findCompanyByName(name: string): Promise<Company | null> {
    return this.companyRepository.findCompanyByName(name);
  }

  async updateCompany(id: number, data: UpdateCompanyDto): Promise<Company> {
    return this.companyRepository.updateCompany(id, data);
  }

  async softDeleteCompany(id: number): Promise<Company> {
    return this.companyRepository.softDeleteCompany(id);
  }

  async restoreCompany(id: number): Promise<Company> {
    return this.companyRepository.restoreCompany(id);
  }
}
