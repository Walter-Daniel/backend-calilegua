import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDTO,
  UpdateProductDTO,
  FilterProductDTO,
} from '../dtos/product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn((dto) => ({
      id: '1',
      ...dto,
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description',
        price: 150000,
        stock: 12,
        origin: 'Argentina',
        image: 'image.com',
        additionalFeatures: [
          {
            name: 'Disco D',
            description: '1TB',
          },
        ],
        manufacturer: 'Argentina 1998',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description',
        price: 200000,
        stock: 12,
        origin: 'Argentina',
        image: 'image.com',
        additionalFeatures: [
          {
            name: 'Disco D',
            description: '2TB',
          },
        ],
        manufacturer: 'Argentina 1998',
      },
    ]),
    findOne: jest.fn((id) => ({ id, name: `Product ${id}` })),
    remove: jest.fn((id) => ({ id, delete: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDTO = {
      name: 'Product 1',
      description: 'Description',
      price: 150000,
      stock: 12,
      origin: 'Argentina',
      image: 'image.com',
      additionalFeatures: [
        {
          name: 'Disco D',
          description: '1TB',
        },
      ],
      manufacturer: 'Argentina 1998',
    };
    const result = await controller.createProduct(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      ok: true,
      message: 'Product created successfully',
      product: {
        id: '1',
        name: 'Product 1',
        description: 'Description',
        price: 150000,
        stock: 12,
        origin: 'Argentina',
        image: 'image.com',
        additionalFeatures: [
          {
            name: 'Disco D',
            description: '1TB',
          },
        ],
        manufacturer: 'Argentina 1998',
      },
    });
  });

  it('should update a product', async () => {
    const productId = '1';
    const dto: UpdateProductDTO = { name: 'Updated Product', price: 200 };
    const result = await controller.updateProduct(productId, dto);

    expect(service.update).toHaveBeenCalledWith(productId, dto);
    expect(result).toEqual({
      ok: true,
      message: 'Product updated successfully',
      data: {
        id: productId,
        name: 'Updated Product',
        price: 200,
      },
    });
  });

  it('should retrieve all products', async () => {
    const params: FilterProductDTO = {
      limit: 10,
      offset: 0,
      minPrice: 0,
      maxPrice: 1000000,
    };

    const result = await controller.getAllProducts(params);

    expect(service.findAll).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      ok: true,
      message: 'All products retrieved successfully',
      products: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description',
          price: 150000,
          stock: 12,
          origin: 'Argentina',
          image: 'image.com',
          additionalFeatures: [
            {
              name: 'Disco D',
              description: '1TB',
            },
          ],
          manufacturer: 'Argentina 1998',
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description',
          price: 200000,
          stock: 12,
          origin: 'Argentina',
          image: 'image.com',
          additionalFeatures: [
            {
              name: 'Disco D',
              description: '2TB',
            },
          ],
          manufacturer: 'Argentina 1998',
        },
      ],
    });
  });

  it('should retrieve a product by ID', async () => {
    const productId = '1';
    const result = await controller.getProductById(productId);

    expect(service.findOne).toHaveBeenCalledWith(productId);
    expect(result).toEqual({
      ok: true,
      message: `Product with ID ${productId} retrieved successfully`,
      product: { id: productId, name: 'Product 1' },
    });
  });

  it('should delete a product', async () => {
    const productId = '1';
    const result = await controller.deleteProduct(productId);

    expect(service.remove).toHaveBeenCalledWith(productId);
    expect(result).toEqual({
      ok: true,
      message: 'Product deleted successfully',
      productId,
      delete: true,
      products: { id: productId, delete: true },
    });
  });
});
