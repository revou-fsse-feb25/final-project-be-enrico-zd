import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });

    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    await this.findUserById(id);
    return this.prisma.user.update({
      where: { user_id: id },
      data: data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    await this.findUserById(id);
    return this.prisma.user.delete({
      where: { user_id: id },
    });
  }
}
