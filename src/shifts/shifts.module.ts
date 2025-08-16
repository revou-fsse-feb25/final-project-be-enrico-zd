import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { ShiftsRepository } from './shift.repository';

@Module({
  controllers: [ShiftsController],
  providers: [ShiftsService, ShiftsRepository],
})
export class ShiftsModule {}
