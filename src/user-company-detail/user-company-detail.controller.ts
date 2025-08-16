import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserCompanyDetailService } from './user-company-detail.service';
import { CreateUserDto } from 'src/users/dto/req/create-user.dto';
import { CreateUserCompanyDetailDto } from './dto/create-user-company-detail.dto';

@Controller('user-company-detail')
export class UserCompanyDetailController {
  constructor(
    private readonly userCompanyDetailService: UserCompanyDetailService,
  ) {}

  @Get(':id')
  async findUserCompById(@Param('id', ParseIntPipe) id: number) {
    try {
      const userCompDetail =
        await this.userCompanyDetailService.findUserCompById(id);
      return userCompDetail;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createuserCompDetail(
    @Body() company_name: string,
    dataUser: CreateUserDto,
    dataUserDetail: CreateUserCompanyDetailDto,
  ) {
    try {
      const userCompDetail =
        await this.userCompanyDetailService.createUserCompDetail(
          company_name,
          dataUser,
          dataUserDetail,
        );

      return userCompDetail;
    } catch (error) {
      console.log(error);
    }
  }
}
