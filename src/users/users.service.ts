import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/req/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAllUser();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findUserById(id);
  }
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }
  async deleteUser(id: number): Promise<User> {
    return this.userRepository.deleteUser(id);
  }
}
