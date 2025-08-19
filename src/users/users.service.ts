import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/req/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => UserCompanyDetailService))
    private readonly userCompDetailService: UserCompanyDetailService,
    private readonly prisma: PrismaService,
  ) {}
  async createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAllUser();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findUserById(id);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findUserByUsername(username);
  }
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.$transaction(async () => {
      const userDetail =
        await this.userCompDetailService.findUserCompByUserId(id);

      if (!userDetail) {
        throw new Error('User Detail not found');
      }

      await this.userCompDetailService.deleteUserComp(
        userDetail.user_company_id,
      );

      return await this.userRepository.deleteUser(id);
    });
  }
}
