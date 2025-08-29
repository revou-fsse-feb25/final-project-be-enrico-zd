import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserCompanyDetailService } from './user-company-detail.service';
import { CreateUserCompanyDetailDto } from './dto/req/create-user-company-detail.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserCompanyDetailDto } from './dto/req/update-user-company-detail.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';
import { RepositoryExceptionFilter } from 'src/common/filters/repository-exception.filter';
import { UserCompanyNotFoundRepositoryException } from 'src/common/exceptions/user-company-not-found.exception.repository';

@UseInterceptors(SerializationInterceptor)
@UseFilters(RepositoryExceptionFilter)
@Controller('user-company-detail')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserCompanyDetailController {
  constructor(
    private readonly userCompanyDetailService: UserCompanyDetailService,
  ) {}

  @Get(':id')
  @Roles('ADMIN')
  async findUserCompById(@Param('id', ParseIntPipe) id: number) {
    const userCompDetail =
      await this.userCompanyDetailService.findUserCompById(id);
    return userCompDetail;
  }

  @Get('employee/:id')
  @Roles('ADMIN')
  async findUserCompByUserId(@Param('id', ParseIntPipe) id: number) {
    const userCompDetail =
      await this.userCompanyDetailService.findUserCompByUserId(id);
    return userCompDetail;
  }

  @Get()
  @Roles('ADMIN')
  async findAllUserCompByCompanyId(@CurrentUser() user: User) {
    const userCompDetail =
      await this.userCompanyDetailService.findAllUserCompByCompanyId(
        user.user_id,
      );

    return userCompDetail;
  }

  @Post('/create')
  @Roles('ADMIN')
  async createUserCompDetail(
    @CurrentUser() user: User,
    @Body() data: CreateUserCompanyDetailDto,
  ) {
    const userDetail = await this.userCompanyDetailService.findUserCompByUserId(
      user.user_id,
    );

    if (!userDetail) {
      throw new UserCompanyNotFoundRepositoryException();
    }

    const userCompDetail =
      await this.userCompanyDetailService.createUserCompDetail(
        userDetail.company_id,
        data,
      );

    return userCompDetail;
  }

  @Patch(':id')
  @Roles('ADMIN')
  async updateUserComp(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserCompanyDetailDto,
  ) {
    const usercompDetail = await this.userCompanyDetailService.updateUserComp(
      id,
      data,
    );
    return usercompDetail;
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteUserComp(@Param('id', ParseIntPipe) id: number) {
    const userCompDetail =
      await this.userCompanyDetailService.deleteUserComp(id);
    return userCompDetail;
  }
}
