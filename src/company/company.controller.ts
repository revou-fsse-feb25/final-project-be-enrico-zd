import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Post()
  // create(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companyService.create(createCompanyDto);
  // }

  @Get(':id')
  async findCompanyById(@Param('id', ParseIntPipe) id: number) {
    try {
      const company = await this.companyService.findCompanyById(id);
      return company;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCompanyDto,
  ) {
    try {
      const company = await this.companyService.updateCompany(id, data);
      return company;
    } catch (error) {
      console.log(error)
    }
  }
}
