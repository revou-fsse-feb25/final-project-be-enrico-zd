import { Test, TestingModule } from '@nestjs/testing';
import { UserCompanyDetailService } from './user-company-detail.service';

describe('UserCompanyDetailService', () => {
  let service: UserCompanyDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCompanyDetailService],
    }).compile();

    service = module.get<UserCompanyDetailService>(UserCompanyDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
