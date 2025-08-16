import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post(':id') // HILANGKAN JUGA ':id' nanti
  async createShift(
    @Param('id', ParseIntPipe) companyId: number, // ubah menggunakna currentuser nanti
    @Body() data: CreateShiftDto,
  ) {
    try {
      const shift = await this.shiftsService.createShift(data, companyId);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id') // HILANGKAN JUGA ':id' nanti
  async findAllShiftByCompanyId(@Param('id', ParseIntPipe) companyId: number) {
    // ubah menggunakna currentuser nanti
    try {
      const shift = await this.shiftsService.findAllShiftByCompanyId(companyId);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async findShiftById(@Param('id', ParseIntPipe) id: number) {
    try {
      const shift = await this.shiftsService.findShiftById(id);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }

  @Patch(':id')
  async updateShift(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateShiftDto,
  ) {
    try {
      const shift = await this.shiftsService.updateShift(id, data);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  async deleteShift(@Param('id', ParseIntPipe) id: number) {
    try {
      const shift = await this.shiftsService.deleteShift(id);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }
}
