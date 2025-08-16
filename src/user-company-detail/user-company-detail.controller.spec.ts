import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyDetailController } from './user-company-detail.controller';
import { UserCompanyDetailService } from './user-company-detail.service';

describe('UserCompanyDetailController', () => {
  let controller: UserCompanyDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCompanyDetailController],
      providers: [UserCompanyDetailService],
    }).compile();

    controller = module.get<UserCompanyDetailController>(UserCompanyDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
