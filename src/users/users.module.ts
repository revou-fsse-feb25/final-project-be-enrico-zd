import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserCompanyDetailModule } from 'src/user-company-detail/user-company-detail.module';

@Module({
  imports: [forwardRef(() => UserCompanyDetailModule)],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule {}
