import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturersService } from './manufacturers.service';
import { Model } from 'mongoose';
import { Manufacturer } from '../entities/manufacturer.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('ManufacturersService', () => {
  let service: ManufacturersService;
  let manufacturerModel: Model<Manufacturer>;

  const mockManufacturerModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManufacturersService,
        {
          provide: getModelToken(Manufacturer.name),
          useValue: mockManufacturerModel,
        },
      ],
    }).compile();

    service = module.get<ManufacturersService>(ManufacturersService);
    manufacturerModel = module.get<Model<Manufacturer>>(
      getModelToken(Manufacturer.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
