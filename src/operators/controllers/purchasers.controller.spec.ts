import { Test, TestingModule } from '@nestjs/testing';
import { PurchasersController } from './purchasers.controller';

describe('PurchasersController', () => {
  let controller: PurchasersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasersController],
    }).compile();

    controller = module.get<PurchasersController>(PurchasersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
