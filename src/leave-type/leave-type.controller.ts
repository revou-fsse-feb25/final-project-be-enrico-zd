import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('leave-type')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @Roles('ADMIN')
  @Post('/create')
  async createLeaveType(
    @Body() data: CreateLeaveTypeDto,
    @CurrentUser() user: User,
  ) {
    try {
      const leaveType = await this.leaveTypeService.createLeaveType(
        data,
        user.user_id,
      );
      return leaveType;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async findAllLeaveTypeByCompanyId(@CurrentUser() user: User) {
    try {
      const leaveType = this.leaveTypeService.findAllLeaveTypeByComapnyId(user.user_id)
      return leaveType;
    } catch (error) {
      console.error(error)
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  async findLeaveTypeById(@Param('id', ParseIntPipe) id: number) {
    try {
      const leaveType = this.leaveTypeService.findLeaveTypeById(id)
      return leaveType;
    } catch (error) {
      console.error(error)
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async updateLeaveType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateLeaveTypeDto,
  ) {
    try{
      const leaveType = await this.leaveTypeService.updateLeaveType(id, data);
      return leaveType;
    } catch (error) {
      console.error(error)
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteLeaveType(@Param('id', ParseIntPipe) id: number) {
    try {
      const leaveType = await this.leaveTypeService.deleteLeaveType(id);
      return leaveType;
    } catch (error) {
      console.error(error)
    }
  }
}
