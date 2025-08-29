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
  UseInterceptors,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from './dto/req/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/req/update-leave-request.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';

@UseInterceptors(SerializationInterceptor)
@Controller('leave-request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  async createLeaveRequest(
    @Body() data: CreateLeaveRequestDto,
    @CurrentUser() user: User,
  ) {
    const leaveRequest = await this.leaveRequestService.createLeaveRequest(
      data,
      user.user_id,
    );
    return leaveRequest;
  }

  @Get()
  @Roles('ADMIN')
  async findAllLeaveRequestByCompanyId(@CurrentUser() user: User) {
    const leaveRequest =
      await this.leaveRequestService.findAllLeaveRequestByCompanyId(
        user.user_id,
      );
    return leaveRequest;
  }

  @Get('/filter')
  async findAllLeaveRequestByType(
    @CurrentUser() user: User,
    @Query('leave_type_id', ParseIntPipe) typeId: number,
  ) {
    const leaveRequest =
      await this.leaveRequestService.findAllLeaveRequestByType(
        user.user_id,
        typeId,
      );

    return leaveRequest;
  }

  @Get('/employee')
  async findAllLeaveRequestByUserId(@CurrentUser() user: User) {
    const leaveRequest =
      await this.leaveRequestService.findAllLeaveRequestByUserId(user.user_id);

    return leaveRequest;
  }

  @Get(':id')
  async findLeaveTypeById(@Param('id', ParseIntPipe) id: number) {
    const leaveRequest = await this.leaveRequestService.findLeaveTypeById(id);
    return leaveRequest;
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
