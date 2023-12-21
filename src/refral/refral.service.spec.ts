import { Test, TestingModule } from '@nestjs/testing';
import { RefralService } from './refral.service';

describe('RefralService', () => {
  let service: RefralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefralService],
    }).compile();

    service = module.get<RefralService>(RefralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
