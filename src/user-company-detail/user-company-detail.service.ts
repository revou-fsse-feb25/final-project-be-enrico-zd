import { Injectable } from '@nestjs/common';
import { CreateUserCompanyDetailDto } from './dto/create-user-company-detail.dto';
import { UserCompanyDetail } from '@prisma/client';
import { UpdateUserCompanyDetailDto } from './dto/update-user-company-detail.dto';
import { UserCompanyDetailRepository } from './user-company-detail.repository';
import { CreateUserDto } from 'src/users/dto/req/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class UserCompanyDetailService {
  constructor(
    private readonly userCompanyDetailRepository: UserCompanyDetailRepository,
    private readonly userService: UsersService,
    private readonly companyService: CompanyService,
    private readonly prisma: PrismaService,
  ) {}

  async createUserCompDetail(
    companyName: string,
    dataUser: CreateUserDto,
    dataUserDetail: CreateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    return this.prisma.$transaction(async () => {
      const user = await this.userService.createUser(dataUser);

      const company = await this.companyService.findCompanyByName(companyName);

      if (!company) {
        throw new Error('company not found');
      }

      return this.userCompanyDetailRepository.createUserCompDetail({
        ...dataUserDetail,
        user_id: user.user_id,
        company_id: company.company_id,
      });
    });
  }

  async findUserCompById(
    user_company_id: number,
  ): Promise<UserCompanyDetail | null> {
    return this.userCompanyDetailRepository.findUserCompById(user_company_id);
  }

  async updateAccount(
    user_company_id: number,
    data: UpdateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    return this.userCompanyDetailRepository.updateAccount(
      user_company_id,
      data,
    );
  }
}
