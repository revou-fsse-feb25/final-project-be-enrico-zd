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
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/req/create-shift.dto';
import { UpdateShiftDto } from './dto/req/update-shift.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptors';
import { RepositoryExceptionFilter } from 'src/common/filters/repository-exception.filter';

@UseInterceptors(SerializationInterceptor)
@UseFilters(RepositoryExceptionFilter)
@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post('/create')
  @Roles('ADMIN')
  async createShift(@CurrentUser() user: User, @Body() data: CreateShiftDto) {
    const shift = await this.shiftsService.createShift(data, user.user_id);
    return shift;
  }

  @Get()
  @Roles('ADMIN')
  async findAllShiftByCompanyId(@CurrentUser() user: User) {
    const shift = await this.shiftsService.findAllShiftByCompanyId(
      user.user_id,
    );
    return shift;
  }

  @Get(':id')
  async findShiftById(@Param('id', ParseIntPipe) id: number) {
    const shift = await this.shiftsService.findShiftById(id);
    return shift;
  }

  @Patch(':id')
  @Roles('ADMIN')
  async updateShift(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateShiftDto,
  ) {
    const shift = await this.shiftsService.updateShift(id, data);
    return shift;
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteShift(@Param('id', ParseIntPipe) id: number) {
    const shift = await this.shiftsService.deleteShift(id);
    return shift;
  }
}
