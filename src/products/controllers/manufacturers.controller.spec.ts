import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from '../services/manufacturers.service';
import { CreateManufacturerDTO } from '../dtos/manufacturer.dto';

describe('ManufacturersController', () => {
  let controller: ManufacturersController;
  let manufacturesService: ManufacturersService;

  const mockManufacturersService = {
    findAll: jest.fn(() => [
      {
        id: '1',
        name: 'Manufacturer 1',
        address: 'Europa 112',
        email: 'manufacturer@email.com',
        image: 'image.com',
      },
      {
        id: '2',
        name: 'Manufacturer 2',
        address: 'Europa 113',
        email: 'manufacturer2@email.com',
        image: 'image.com',
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      name: `Manufacturer ${id}`,
    })),
    create: jest.fn((dto) => ({
      id: '1',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturersController],
      providers: [
        {
          provide: ManufacturersService,
          useValue: mockManufacturersService,
        },
      ],
    }).compile();

    controller = module.get<ManufacturersController>(ManufacturersController);
    manufacturesService =
      module.get<ManufacturersService>(ManufacturersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a manufacturer', () => {
    const dto: CreateManufacturerDTO = {
      name: 'Manufacturer 1',
      address: 'Europa 112',
      email: 'manufacturer@email.com',
      image: 'image.com',
    };
    const result = controller.createManufacturer(dto);

    expect(manufacturesService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      ok: true,
      message: 'Manufacturer created successfully',
    });
  });

  it('should retrieve all manufacturers', async () => {
    const result = await controller.getAllManufacturers();

    expect(manufacturesService.findAll).toHaveBeenCalled();
    expect(result).toEqual({
      ok: true,
      message: 'All manufacturers retrieved successfully',
      manufactures: [
        {
          id: '1',
          name: 'Manufacturer 1',
          address: 'Europa 112',
          email: 'manufacturer@email.com',
          image: 'image.com',
        },
        {
          id: '2',
          name: 'Manufacturer 2',
          address: 'Europa 113',
          email: 'manufacturer2@email.com',
          image: 'image.com',
        },
      ],
    });
  });

  it('should retrieve a manufacturer by ID', async () => {
    const manufactureId = '1';
    const result = await controller.getManufacturerById(manufactureId);

    expect(manufacturesService.findOne).toHaveBeenCalledWith(manufactureId);
    expect(result).toEqual({
      ok: true,
      message: `Manufacturer with ID ${manufactureId} retrieved successfully`,
      manufacture: { id: manufactureId, name: `Manufacturer ${manufactureId}` },
    });
  });
});
