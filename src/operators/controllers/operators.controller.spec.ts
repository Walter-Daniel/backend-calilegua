import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsController } from './operators.controller';
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDTO } from '../dtos/operators.dto';

describe('OperatorsController', () => {
  let controller: OperatorsController;
  let operatorsService: OperatorsService;

  const mockOperatorService = {
    create: jest.fn((dto) => ({
      id: '1',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorsController],
      providers: [
        {
          provide: OperatorsService,
          useValue: mockOperatorService,
        },
      ],
    }).compile();

    controller = module.get<OperatorsController>(OperatorsController);
    operatorsService = module.get<OperatorsService>(OperatorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register an operator', async () => {
    const dto: CreateOperatorDTO = {
      name: 'María',
      lastname: 'Lopez',
      email: 'maria@email.com',
      password: '123456',
    };
    const result = await controller.register(dto);

    expect(operatorsService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      ok: true,
      message: 'Operator created successfully',
      data: {
        id: '1',
        name: 'María',
        lastname: 'Lopez',
        email: 'maria@email.com',
        password: '123456',
      },
    });
  });
});
