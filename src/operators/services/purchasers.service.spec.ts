import { Test, TestingModule } from '@nestjs/testing';
import { PurchasersService } from './purchasers.service';

describe('PurchasersService', () => {
  let service: PurchasersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasersService],
    }).compile();

    service = module.get<PurchasersService>(PurchasersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
