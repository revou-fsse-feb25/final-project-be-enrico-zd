import { Controller, Get, Body, Patch, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/create')
  async createCompany(@Body() data: CreateCompanyDto) {
    try {
      const company = this.companyService.createCompany(data);
      return company;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findCurrentCompany(@CurrentUser() user: User) {
    try {
      const company = await this.companyService.findCurrentCompany(
        user.user_id,
      );
      return company;
    } catch (error) {
      console.error(error);
    }
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateCompany(
    @CurrentUser() user: User,
    @Body() data: UpdateCompanyDto,
  ) {
    try {
      const company = await this.companyService.updateCompany(
        user.user_id,
        data,
      );
      return company;
    } catch (error) {
      console.error(error);
    }
  }
}
