import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserCompanyDetailDto } from './dto/create-user-company-detail.dto';
import { UserCompanyDetail } from '@prisma/client';
import { UpdateUserCompanyDetailDto } from './dto/update-user-company-detail.dto';
import { UserCompanyDetailRepository } from './user-company-detail.repository';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from 'src/company/company.service';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class UserCompanyDetailService {
  constructor(
    private readonly userCompanyDetailRepository: UserCompanyDetailRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => ShiftsService))
    private readonly shiftService: ShiftsService,
    private readonly prisma: PrismaService,
  ) {}

  async createUserCompDetail(
    companyId: number,
    dataEmployee: CreateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    return this.prisma.$transaction(async () => {
      const userData = dataEmployee.user;
      const userEmployeeData = dataEmployee.employee;

      const company = await this.companyService.findCompanyById(companyId);

      if (!company) {
        throw new NotFoundException('company not found');
      }

      const user = await this.userService.createUser(userData);

      const companyName = company.company_name;
      const companyUsername = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

      const employeeUsername = `${user.username}-${companyUsername}`;

      return await this.userCompanyDetailRepository.createUserCompDetail({
        ...userEmployeeData,
        employee_username: employeeUsername,
        user_id: user.user_id,
        company_id: companyId,
      });
    });
  }

  async findUserCompById(
    user_company_id: number,
  ): Promise<UserCompanyDetail | null> {
    return this.userCompanyDetailRepository.findUserCompById(user_company_id);
  }

  async findUserCompByUserId(
    userId: number,
  ): Promise<UserCompanyDetail | null> {
    return this.userCompanyDetailRepository.findUserCompByUserId(userId);
  }

  async findAllUserCom() {
    return this.userCompanyDetailRepository.findAllUserComp();
  }

  async findAllUserCompByCompanyId(userId: number) {
    const userDetail = await this.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new NotFoundException('user detail not found');
    }

    return await this.userCompanyDetailRepository.findAllUserCompByCompanyId(
      userDetail.company_id,
    );
  }

  async findUserCompByCompanyId(companyId: number) {
    return this.userCompanyDetailRepository.findUserCompByCompanyId(companyId);
  }

  async findUserCompByUserIdAndCompanyId(
    username: string,
    companyId: number,
  ): Promise<UserCompanyDetail | null> {
    return this.userCompanyDetailRepository.findUserCompByUserIdAndCompanyId(
      username,
      companyId,
    );
  }

  async updateUserComp(
    user_company_id: number,
    dataEmployee: UpdateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    const userData = dataEmployee.user;
    const userEmployeeData = dataEmployee.employee;

    const userDetail = await this.findUserCompById(user_company_id);

    if (!userDetail) {
      throw new NotFoundException('user detail not found');
    }

    const company = await this.companyService.findCompanyById(
      userDetail.company_id,
    );

    if (!company) {
      throw new NotFoundException('company not found');
    }

    const shift = await this.shiftService.findAllShiftByCompanyId(
      company.company_id,
    );

    const validShift = shift.some(
      (shift) => shift.shift_id === userEmployeeData.shift_id,
    );

    if (!validShift) {
      throw new NotFoundException(
        `Shift dengan id ${userEmployeeData.shift_id} tidak valid untuk company ${company.company_name}`,
      );
    }

    await this.userService.updateUser(userDetail.user_id, userData);

    return this.userCompanyDetailRepository.updateUserComp(
      user_company_id,
      userEmployeeData,
    );
  }

  async deleteUserComp(user_company_id: number): Promise<UserCompanyDetail> {
    return this.userCompanyDetailRepository.deleteUserComp(user_company_id);
  }
}
