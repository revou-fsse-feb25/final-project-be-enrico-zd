import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CompanyRepository } from './company.repository';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, StatusActive } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ShiftsService } from 'src/shifts/shifts.service';
import { CreateShiftDto } from 'src/shifts/dto/req/create-shift.dto';
import { CreateUserCompanyDetailDto } from 'src/user-company-detail/dto/req/create-user-company-detail.dto';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';
import { CompanyNotFoundRepositoryException } from 'src/common/exceptions/company-not-found.exception.repository';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly shiftService: ShiftsService,
    @Inject(forwardRef(() => UserCompanyDetailService))
    private readonly userCompDetailService: UserCompanyDetailService,
    private readonly prisma: PrismaService,
  ) {}

  async createCompany(data: CreateCompanyDto): Promise<Company> {
    return this.prisma.$transaction(async () => {
      const company = await this.companyRepository.createCompany(data);

      const defaultShift: CreateShiftDto = {
        title: 'Shift Pagi',
        opening_time: new Date(`1970-01-01T08:00:00Z`),
        closing_time: new Date(`1970-01-01T16:00:00Z`),
        status: StatusActive.ACTIVE,
      };

      const shift = await this.shiftService.createShiftDefault(
        defaultShift,
        company.company_id,
      );

      const companyName = company.company_name;
      const companyUsername = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

      const defaultUser: CreateUserCompanyDetailDto = {
        user: {
          nik: null,
          family_card_number: null,
          employment_number: null,
          passport_number: null,
          name: 'Admin',
          address: 'Confidential',
          email: 'admin@admin.com',
          phone_number: '987221111111',
          date_of_birth: new Date('1995-02-10T00:00:00.000Z'),
          gender: 'MALE',
          role: 'ADMIN',
          username: 'admin123',
          password: 'admin2025',
        },
        employee: {
          user_id: 1,
          company_id: 1,
          employee_type: 'PERMANENT',
          user_type: 'FIELD',
          joining_date: new Date(),
          leaving_date: null,
          shift_id: shift.shift_id,
          workspace: 'OFFICE',
          user_status: 'ACTIVE',
          employee_username: `admin-${companyUsername}`,
        },
      };

      await this.userCompDetailService.createUserCompDetail(
        company.company_id,
        defaultUser,
      );

      return company;
    });
  }

  async findCurrentCompany(userId: number): Promise<Company | null> {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const company = await this.companyRepository.findCurrentCompany(
      userDetail.company_id,
    );

    if (!company) {
      throw new CompanyNotFoundRepositoryException();
    }

    return company;
  }

  async findCompanyById(id: number): Promise<Company | null> {
    const company = await this.companyRepository.findCompanyById(id);

    if (!company) {
      throw new CompanyNotFoundRepositoryException();
    }
    return company;
  }

  async findCompanyByName(name: string): Promise<Company | null> {
    const company = await this.companyRepository.findCompanyByName(name);
    return company;
  }

  async updateCompany(
    userId: number,
    data: UpdateCompanyDto,
  ): Promise<Company> {
    const userDetail =
      await this.userCompDetailService.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    try {
      return this.companyRepository.updateCompany(userDetail.company_id, data);
    } catch {
      throw new BadRequestException('Failed to update company');
    }
  }

  async softDeleteCompany(id: number): Promise<Company> {
    try {
      return this.companyRepository.softDeleteCompany(id);
    } catch {
      throw new BadRequestException('Failed to delete company');
    }
  }

  async restoreCompany(id: number): Promise<Company> {
    try {
      return this.companyRepository.restoreCompany(id);
    } catch {
      throw new BadRequestException('Failed to restore company');
    }
  }
}
