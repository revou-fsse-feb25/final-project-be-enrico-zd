import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';
import { RepositoryExceptionFilter } from 'src/common/filters/repository-exception.filter';

@UseInterceptors(SerializationInterceptor)
@UseFilters(RepositoryExceptionFilter)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/create')
  async createCompany(@Body() data: CreateCompanyDto) {
    const company = this.companyService.createCompany(data);
    return company;
  }

  @Get(':id')
  async findCompanyById(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.findCompanyById(id);
    return company;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findCurrentCompany(@CurrentUser() user: User) {
    const company = await this.companyService.findCurrentCompany(user.user_id);
    return company;
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateCompany(
    @CurrentUser() user: User,
    @Body() data: UpdateCompanyDto,
  ) {
    const company = await this.companyService.updateCompany(user.user_id, data);
    return company;
  }
  @Patch('/softDelete/:id')
  async softDeleteCompany(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.softDeleteCompany(id);
    return company;
  }

  @Patch('/restore/:id')
  async restoreCompany(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.restoreCompany(id);
    return company;
  }
}
