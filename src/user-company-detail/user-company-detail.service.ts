import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserCompanyDetailDto } from './dto/req/create-user-company-detail.dto';
import { UserCompanyDetail } from '@prisma/client';
import { UpdateUserCompanyDetailDto } from './dto/req/update-user-company-detail.dto';
import { UserCompanyDetailRepository } from './user-company-detail.repository';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from 'src/company/company.service';
import { ShiftsService } from 'src/shifts/shifts.service';
import { AttendanceService } from 'src/attendance/attendance.service';
import { CompanyNotFoundRepositoryException } from 'src/common/exceptions/company-not-found.exception.repository';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';
import { ShiftNotFoundRepositoryException } from 'src/common/exceptions/shift-not-found.exception.repository';

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
    @Inject(forwardRef(() => AttendanceService))
    private readonly attendanceService: AttendanceService,
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
        throw new CompanyNotFoundRepositoryException('company not found');
      }

      const user = await this.userService.createUser(userData);

      await this.attendanceService.createDefaultUserAttendance({
        user_id: user.user_id,
        company_id: companyId,
        shift_id: userEmployeeData.shift_id,
      });

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
    const userCompany =
      await this.userCompanyDetailRepository.findUserCompById(user_company_id);
    if (!userCompany) {
      throw new UserCompanyNotFoundRepositoryException();
    }
    return userCompany;
  }

  async findUserCompByUserId(
    userId: number,
  ): Promise<UserCompanyDetail | null> {
    const userCompany =
      await this.userCompanyDetailRepository.findUserCompByUserId(userId);
    if (!userCompany) {
      throw new UserCompanyNotFoundRepositoryException();
    }
    return userCompany;
  }

  async findAllUserCom() {
    const usersCompany =
      await this.userCompanyDetailRepository.findAllUserComp();
    return usersCompany;
  }

  async findAllUserCompByCompanyId(userId: number) {
    const userDetail = await this.findUserCompByUserId(userId);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const userDetailByCompanyId =
      await this.userCompanyDetailRepository.findAllUserCompByCompanyId(
        userDetail.company_id,
      );

    if (!userDetailByCompanyId) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    return userDetailByCompanyId;
  }

  async findUserCompByCompanyId(companyId: number) {
    const userDetail =
      await this.userCompanyDetailRepository.findUserCompByCompanyId(companyId);
    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }
    return userDetail;
  }

  async findUserCompByUserIdAndCompanyId(
    username: string,
    companyId: number,
  ): Promise<UserCompanyDetail | null> {
    const userDetail =
      await this.userCompanyDetailRepository.findUserCompByUserIdAndCompanyId(
        username,
        companyId,
      );
    return userDetail;
  }

  async updateUserComp(
    user_company_id: number,
    dataEmployee: UpdateUserCompanyDetailDto,
  ): Promise<UserCompanyDetail> {
    const userData = dataEmployee.user;
    const userEmployeeData = dataEmployee.employee;

    const userDetail = await this.findUserCompById(user_company_id);

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const company = await this.companyService.findCompanyById(
      userDetail.company_id,
    );

    if (!company) {
      throw new CompanyNotFoundRepositoryException();
    }

    const shift = await this.shiftService.findAllShiftByCompanyId(
      company.company_id,
    );

    if (!shift) {
      throw new ShiftNotFoundRepositoryException();
    }

    const validShift = shift.some(
      (shift) => shift.shift_id === userEmployeeData.shift_id,
    );

    if (!validShift) {
      throw new ShiftNotFoundRepositoryException(
        `Shift dengan id ${userEmployeeData.shift_id} tidak valid untuk company ${company.company_name}`,
      );
    }

    try {
      await this.userService.updateUser(userDetail.user_id, userData);
    } catch {
      throw new BadRequestException('Failed to update user company detail');
    }

    return this.userCompanyDetailRepository.updateUserComp(
      user_company_id,
      userEmployeeData,
    );
  }

  async deleteUserComp(user_company_id: number): Promise<UserCompanyDetail> {
    try {
      return this.userCompanyDetailRepository.deleteUserComp(user_company_id);
    } catch {
      throw new BadRequestException('Failed to delete user company detail');
    }
  }
}
