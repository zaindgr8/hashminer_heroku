import { Test, TestingModule } from '@nestjs/testing';
import { RefralController } from './refral.controller';
import { RefralService } from './refral.service';

describe('RefralController', () => {
  let controller: RefralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefralController],
      providers: [RefralService],
    }).compile();

    controller = module.get<RefralController>(RefralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
