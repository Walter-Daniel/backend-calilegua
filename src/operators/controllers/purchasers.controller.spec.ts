import { Test, TestingModule } from '@nestjs/testing';
import { PurchasersController } from './purchasers.controller';
import { PurchasersService } from '../services/purchasers.service';
import {
  CreatePurchaserDTO,
  FilterPurchaserDTO,
  UpdatePurchaserDTO,
} from '../dtos/purchaser.dto';

describe('PurchasersController', () => {
  let controller: PurchasersController;
  let service: PurchasersService;

  const mockPurchasersService = {
    create: jest.fn((dto) => ({ id: '1', ...dto })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(() => null),
    findAll: jest.fn(() => [
      { id: '1', name: 'Purchaser 1' },
      { id: '2', name: 'Purchaser 2' },
    ]),
    findOne: jest.fn((id) => ({ id, name: `Purchaser ${id}` })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasersController],
      providers: [
        {
          provide: PurchasersService,
          useValue: mockPurchasersService,
        },
      ],
    }).compile();

    controller = module.get<PurchasersController>(PurchasersController);
    service = module.get<PurchasersService>(PurchasersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a purchaser', async () => {
    const dto: CreatePurchaserDTO = {
      name: 'María',
      lastname: 'Lopez',
      phone: '+543812222111',
      age: 30,
      email: 'maria@email.com',
      addresses: [
        {
          street: 'Ejercito del Norte',
          number: 1555,
          city: 'Rafaela',
        },
        {
          street: 'Emilio Castelar',
          number: 5111,
          city: 'Villa Roel',
        },
        {
          street: 'Pasaje Cabildo',
          number: 2574,
          city: 'Libertad',
        },
      ],
    };
    const result = await controller.createPurchaser(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      ok: true,
      message: 'Purchaser created successfully',
      data: {
        id: '1',
        name: 'María',
        lastname: 'Lopez',
        phone: '+543812222111',
        age: 30,
        email: 'maria@email.com',
        addresses: [
          {
            street: 'Ejercito del Norte',
            number: 1555,
            city: 'Rafaela',
          },
          {
            street: 'Emilio Castelar',
            number: 5111,
            city: 'Villa Roel',
          },
          {
            street: 'Pasaje Cabildo',
            number: 2574,
            city: 'Libertad',
          },
        ],
      },
    });
  });

  it('should update a purchaser', async () => {
    const purchaserId = '1';
    const dto: UpdatePurchaserDTO = { name: 'Updated Purchaser' };
    const result = await controller.updatePurchaser(purchaserId, dto);

    expect(service.update).toHaveBeenCalledWith(purchaserId, dto);
    expect(result).toEqual({
      ok: true,
      message: 'Purchaser updated successfully',
      data: { id: purchaserId, name: 'Updated Purchaser' },
    });
  });

  it('should delete a purchaser', async () => {
    const purchaserId = '1';
    const result = await controller.deletePurchaser(purchaserId);

    expect(service.remove).toHaveBeenCalledWith(purchaserId);
    expect(result).toEqual({
      ok: true,
      message: 'Purchaser deleted successfully',
    });
  });

  it('should retrieve all purchasers', async () => {
    const params: FilterPurchaserDTO = {
      limit: 10,
      offset: 1,
      maxAge: 99,
      minAge: 18,
    };
    const result = await controller.getAllPurchasers(params);

    expect(service.findAll).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      ok: true,
      message: 'All purchasers retrieved successfully',
      purchasers: [
        { id: '1', name: 'Purchaser 1' },
        { id: '2', name: 'Purchaser 2' },
      ],
    });
  });

  it('should retrieve a purchaser by ID', async () => {
    const purchaserId = '1';
    const result = await controller.getPurchaserById(purchaserId);

    expect(service.findOne).toHaveBeenCalledWith(purchaserId);
    expect(result).toEqual({
      ok: true,
      message: `Purchaser with ID ${purchaserId} retrieved successfully`,
      purchaser: { id: purchaserId, name: 'Purchaser 1' },
    });
  });
});
