import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/req/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserCompanyDetailService } from 'src/user-company-detail/user-company-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundRepositoryException } from 'src/common/exceptions/user-not-found.exception.repository';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => UserCompanyDetailService))
    private readonly userCompDetailService: UserCompanyDetailService,
    private readonly prisma: PrismaService,
  ) {}
  async createUser(data: CreateUserDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    try {
      return this.userRepository.createUser({
        ...data,
        password: hashed,
      });
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAllUser(): Promise<User[]> {
    const users = await this.userRepository.findAllUser();
    return users;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new UserNotFoundRepositoryException();
    }
    return user;
  }
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    try {
      return this.userRepository.updateUser(id, data);
    } catch {
      throw new BadRequestException('Failed to update user');
    }
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.$transaction(async () => {
      const userDetail =
        await this.userCompDetailService.findUserCompByUserId(id);

      if (!userDetail) {
        throw new UserCompanyNotFoundRepositoryException();
      }

      await this.userCompDetailService.deleteUserComp(
        userDetail.user_company_id,
      );

      try {
        return await this.userRepository.deleteUser(id);
      } catch {
        throw new BadRequestException('Failed to delete user');
      }
    });
  }
}
