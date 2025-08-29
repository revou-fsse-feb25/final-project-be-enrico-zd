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
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto } from './dto/req/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/req/update-leave-type.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';
import { RepositoryExceptionFilter } from 'src/common/filters/repository-exception.filter';

@UseInterceptors(SerializationInterceptor)
@UseFilters(RepositoryExceptionFilter)
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
    const leaveType = await this.leaveTypeService.createLeaveType(
      data,
      user.user_id,
    );
    return leaveType;
  }

  @Get()
  async findAllLeaveTypeByCompanyId(@CurrentUser() user: User) {
    const leaveType = this.leaveTypeService.findAllLeaveTypeByComapnyId(
      user.user_id,
    );
    return leaveType;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findLeaveTypeById(@Param('id', ParseIntPipe) id: number) {
    const leaveType = this.leaveTypeService.findLeaveTypeById(id);
    return leaveType;
  }

  @Roles('ADMIN')
  @Patch(':id')
  async updateLeaveType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateLeaveTypeDto,
  ) {
    const leaveType = await this.leaveTypeService.updateLeaveType(id, data);
    return leaveType;
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteLeaveType(@Param('id', ParseIntPipe) id: number) {
    const leaveType = await this.leaveTypeService.deleteLeaveType(id);
    return leaveType;
  }
}
