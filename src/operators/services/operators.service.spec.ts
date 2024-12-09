import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsService } from './operators.service';
import { getModelToken } from '@nestjs/mongoose';
import { Operator } from '../entities/operators.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('OperatorsService', () => {
  let service: OperatorsService;
  let model: Model<Operator>;

  const mockOperatorModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorsService,
        {
          provide: getModelToken(Operator.name),
          useValue: mockOperatorModel,
        },
      ],
    }).compile();

    service = module.get<OperatorsService>(OperatorsService);
    model = module.get<Model<Operator>>(getModelToken(Operator.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new operator', async () => {
  //     const createOperatorDto = {
  //       email: 'test@example.com',
  //       password: 'password123',
  //       name: 'Operator',
  //       lastname: 'OperatorL',
  //     };
  //     const hashedPassword = 'hashedPassword';
  //     const mockOperator = {
  //       _id: '1',
  //       ...createOperatorDto,
  //       password: hashedPassword,
  //       toJSON: jest
  //         .fn()
  //         .mockReturnValue({ _id: '1', email: 'test@example.com' }),
  //     };

  //     (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
  //     jest.spyOn(model, 'create').mockResolvedValue(mockOperator as any);

  //     const result = await service.create(createOperatorDto);
  //     expect(result).toEqual({ _id: '1', email: 'test@example.com' });
  //     expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  //     expect(model.create).toHaveBeenCalledWith({
  //       ...createOperatorDto,
  //       password: hashedPassword,
  //     });
  //   });
  // });

  describe('findByEmail', () => {
    it('should return an operator by email', async () => {
      const mockOperator = {
        _id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOperator),
      } as any);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockOperator);
      expect(model.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should throw NotFoundException if operator is not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
