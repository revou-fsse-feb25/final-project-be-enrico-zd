import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserCompanyDetailDto } from './dto/create-user-company-detail.dto';
import { UserCompanyDetail } from '@prisma/client';
import { UpdateUserCompanyDetailDto } from './dto/update-user-company-detail.dto';

@Injectable()
export class UserCompanyDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserCompDetail(
    data: CreateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    return this.prisma.userCompanyDetail.create({
      data,
    });
  }

  async findUserCompById(
    user_company_id: number,
  ): Promise<UserCompanyDetail | null> {
    const userCompany = await this.prisma.userCompanyDetail.findUnique({
      where: {
        user_company_id,
      },
      include: {
        company: true,
        user: true,
      },
    });

    return userCompany;
  }

  async updateAccount(
    user_company_id: number,
    data: UpdateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    await this.findUserCompById(user_company_id);
    return this.prisma.userCompanyDetail.update({
      where: { user_company_id },
      data: data,
    });
  }
}
