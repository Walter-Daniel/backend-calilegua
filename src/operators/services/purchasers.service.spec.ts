import { Test, TestingModule } from '@nestjs/testing';
import { PurchasersService } from './purchasers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Purchaser } from '../entities/purchaser.entity';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PurchasersService', () => {
  let service: PurchasersService;
  let model: Model<Purchaser>;

  const mockPurchaser = {
    id: '1',
    name: 'María',
    lastname: 'Lopez',
    phone: '+543812222111',
    age: 31,
    email: 'maria@email.com',
    addresses: [
      {
        street: 'Pasaje Cabildo',
        number: 2574,
        city: 'Libertad',
      },
    ],
  };

  const mockPurchaserModel = {
    create: jest.fn().mockResolvedValue(mockPurchaser),
    findById: jest.fn().mockResolvedValue(mockPurchaser),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      ...mockPurchaser,
      age: 31,
    }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    find: jest.fn().mockResolvedValue([mockPurchaser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasersService,
        {
          provide: getModelToken(Purchaser.name),
          useValue: mockPurchaserModel,
        },
      ],
    }).compile();

    service = module.get<PurchasersService>(PurchasersService);
    model = module.get<Model<Purchaser>>(getModelToken(Purchaser.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if age is less than 18', async () => {
    const createPurchaserDto = {
      name: 'María',
      lastname: 'Lopez',
      phone: '+543812222111',
      age: 17,
      email: 'maria@email.com',
      addresses: [{ street: 'Pasaje Cabildo', number: 2574, city: 'Libertad' }],
    };
    await expect(service.create(createPurchaserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find a purchaser by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockPurchaser);
    expect(mockPurchaserModel.findById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if purchaser is not found', async () => {
    mockPurchaserModel.findById.mockResolvedValueOnce(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a purchaser', async () => {
    const result = await service.update('1', { age: 31 });
    expect(result).toEqual({ ...mockPurchaser, age: 31 });
    expect(mockPurchaserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { age: 31 },
      { new: true },
    );
  });

  it('should throw BadRequestException if update age is less than 18', async () => {
    await expect(service.update('1', { age: 17 })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should delete a purchaser', async () => {
    await service.remove('1');
    expect(mockPurchaserModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should throw NotFoundException if purchaser to delete is not found', async () => {
    mockPurchaserModel.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});
