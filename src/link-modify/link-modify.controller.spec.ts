import { Test, TestingModule } from '@nestjs/testing';
import { LinkModifyController } from './link-modify.controller';

describe('LinkModifyController', () => {
  let controller: LinkModifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkModifyController],
    }).compile();

    controller = module.get<LinkModifyController>(LinkModifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
