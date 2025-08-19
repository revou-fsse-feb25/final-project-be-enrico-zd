import { forwardRef, Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { ShiftsRepository } from './shift.repository';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';

@Module({
  imports: [forwardRef(() => UserCompanyDetailModule)],
  controllers: [ShiftsController],
  providers: [ShiftsService, ShiftsRepository],
  exports: [ShiftsService],
})
export class ShiftsModule {}
