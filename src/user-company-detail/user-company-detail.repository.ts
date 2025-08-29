import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createEmployeeDto } from './dto/req/create-user-company-detail.dto';
import { UserCompanyDetail } from '@prisma/client';
import { UpdateEmployeeDto } from './dto/req/update-user-company-detail.dto';

@Injectable()
export class UserCompanyDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserCompDetail(
    data: createEmployeeDto,
  ): Promise<UserCompanyDetail> {
    return this.prisma.userCompanyDetail.create({
      data,
    });
  }

  async findAllUserComp() {
    return this.prisma.userCompanyDetail.findMany({
      select: {
        user_id: true,
        company_id: true,
        shift_id: true,
      },
    });
  }

  async findAllUserCompByCompanyId(
    companyId: number,
  ): Promise<UserCompanyDetail[]> {
    const userCompany = await this.prisma.userCompanyDetail.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        company: true,
        user: true,
      },
    });

    return userCompany;
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

  async findUserCompByUserId(
    userId: number,
  ): Promise<UserCompanyDetail | null> {
    const userCompany = await this.prisma.userCompanyDetail.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        company: true,
        user: true,
      },
    });

    return userCompany;
  }

  async findUserCompByCompanyId(
    companyId: number,
  ): Promise<UserCompanyDetail | null> {
    const userCompany = await this.prisma.userCompanyDetail.findFirst({
      where: {
        company_id: companyId,
      },
    });

    return userCompany;
  }

  async findUserCompByUserIdAndCompanyId(
    username: string,
    companyId: number,
  ): Promise<UserCompanyDetail | null> {
    const userCompany = await this.prisma.userCompanyDetail.findFirst({
      where: {
        company_id: companyId,
        user: {
          username,
        },
      },
    });

    return userCompany;
  }

  async updateUserComp(
    user_company_id: number,
    data: UpdateEmployeeDto,
  ): Promise<UserCompanyDetail> {
    await this.findUserCompById(user_company_id);
    return this.prisma.userCompanyDetail.update({
      where: { user_company_id },
      data: data,
    });
  }

  async deleteUserComp(id: number): Promise<UserCompanyDetail> {
    await this.findUserCompById(id);
    return this.prisma.userCompanyDetail.delete({
      where: { user_company_id: id },
    });
  }
}
