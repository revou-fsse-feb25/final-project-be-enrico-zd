import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAllUser() {
    try {
      const users = await this.usersService.findAllUser();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findUserById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.updateUser(id, data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.deleteUser(id);
      return {
        message: `user with ID ${id} successfuly delete`,
      }
    } catch (error) {
      console.log(error);
    }
  }
}
