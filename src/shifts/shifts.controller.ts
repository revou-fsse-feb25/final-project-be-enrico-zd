import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post('/create')
  @Roles('ADMIN')
  async createShift(@CurrentUser() user: User, @Body() data: CreateShiftDto) {
    try {
      const shift = await this.shiftsService.createShift(data, user.user_id);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  @Roles('ADMIN')
  async findAllShiftByCompanyId(@CurrentUser() user: User) {
    try {
      const shift = await this.shiftsService.findAllShiftByCompanyId(
        user.user_id,
      );
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
  @Roles('ADMIN')
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
  @Roles('ADMIN')
  async deleteShift(@Param('id', ParseIntPipe) id: number) {
    try {
      const shift = await this.shiftsService.deleteShift(id);
      return shift;
    } catch (error) {
      console.error(error);
    }
  }
}
