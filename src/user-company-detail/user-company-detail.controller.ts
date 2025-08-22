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
  UseGuards,
} from '@nestjs/common';
import { UserCompanyDetailService } from './user-company-detail.service';
import { CreateUserCompanyDetailDto } from './dto/create-user-company-detail.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserCompanyDetailDto } from './dto/update-user-company-detail.dto';

@Controller('user-company-detail')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserCompanyDetailController {
  constructor(
    private readonly userCompanyDetailService: UserCompanyDetailService,
  ) {}

  @Get(':id')
  @Roles('ADMIN')
  async findUserCompById(@Param('id', ParseIntPipe) id: number) {
    try {
      const userCompDetail =
        await this.userCompanyDetailService.findUserCompById(id);
      return userCompDetail;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  @Roles('ADMIN')
  async findAllUserCompByCompanyId(@CurrentUser() user: User) {
    try {
      const userCompDetail =
        await this.userCompanyDetailService.findAllUserCompByCompanyId(
          user.user_id,
        );

      return userCompDetail;
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/create')
  @Roles('ADMIN')
  async createUserCompDetail(
    @CurrentUser() user: User,
    @Body() data: CreateUserCompanyDetailDto,
  ) {
    try {
      const userDetail =
        await this.userCompanyDetailService.findUserCompByUserId(user.user_id);

      if (!userDetail) {
        throw new NotFoundException('user detail not found');
      }

      const userCompDetail =
        await this.userCompanyDetailService.createUserCompDetail(
          userDetail.company_id,
          data,
        );

      return userCompDetail;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  @Roles('ADMIN')
  async updateUserComp(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserCompanyDetailDto,
  ) {
    try {
      const usercompDetail = await this.userCompanyDetailService.updateUserComp(
        id,
        data,
      );
      return usercompDetail;
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteUserComp(@Param('id', ParseIntPipe) id: number) {
    try {
      const userCompDetail =
        await this.userCompanyDetailService.deleteUserComp(id);
      return userCompDetail;
    } catch (error) {
      console.error(error);
    }
  }
}
