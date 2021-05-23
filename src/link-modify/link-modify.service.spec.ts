import { Test, TestingModule } from '@nestjs/testing';
import { LinkModifyService } from './link-modify.service';

describe('LinkModifyService', () => {
  let service: LinkModifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkModifyService],
    }).compile();

    service = module.get<LinkModifyService>(LinkModifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
