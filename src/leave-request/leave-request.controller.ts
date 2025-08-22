import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterLeaveRequestDto } from './dto/filter-leave-request.dto';

@Controller('leave-request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  async createLeaveRequest(
    @Body() data: CreateLeaveRequestDto,
    @CurrentUser() user: User,
  ) {
    try {
      const leaveRequest = await this.leaveRequestService.createLeaveRequest(
        data,
        user.user_id,
      );
      return leaveRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  @Roles('ADMIN')
  async findAllLeaveRequestByCompanyId(@CurrentUser() user: User) {
    try {
      const leaveRequest =
        await this.leaveRequestService.findAllLeaveRequestByCompanyId(
          user.user_id,
        );
      return leaveRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/filter')
  async findAllLeaveRequestByType(
    @CurrentUser() user: User,
    @Query('leave_type_id', ParseIntPipe) typeId: number,
  ) {
    try {
      const leaveRequest =
        await this.leaveRequestService.findAllLeaveRequestByType(
          user.user_id,
          typeId,
        );

      return leaveRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/employee')
  async findAllLeaveRequestByUserId(@CurrentUser() user: User) {
    try {
      const leaveRequest =
        await this.leaveRequestService.findAllLeaveRequestByUserId(
          user.user_id,
        );

      return leaveRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async findLeaveTypeById(@Param('id', ParseIntPipe) id: number) {
    try {
      const leaveRequest = await this.leaveRequestService.findLeaveTypeById(id);
      return leaveRequest;
    } catch (error) {
      console.error(error);
    }
  }

  @Patch(':id')
  @Roles('ADMIN')
  async approveLeaveRequest(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() updateLeaveRequestDto: UpdateLeaveRequestDto,
  ) {
    return this.leaveRequestService.approveLeaveRequest(
      id,
      user.user_id,
      updateLeaveRequestDto,
    );
  }
}
