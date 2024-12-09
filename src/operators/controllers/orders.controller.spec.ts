import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDTO, AddProductToOrderDTO } from '../dtos/order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const mockOrdersService = {
      create: jest
        .fn()
        .mockResolvedValue({ id: '1', customerId: '123', products: [] }),
      addProductToOrder: jest
        .fn()
        .mockResolvedValue({ id: '1', products: ['product1'] }),
      removeProducts: jest.fn().mockResolvedValue({ id: '1', products: [] }),
      findAll: jest
        .fn()
        .mockResolvedValue([{ id: '1', customerId: '123', products: [] }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: CreateOrderDTO = { purchaserId: '123', items: [] };
    const result = await controller.createOrder(createOrderDto);
    expect(result.message).toBe('Order created successfully');
    expect(result.ok).toBe(true);
    expect(result.order.id).toBeDefined();
    expect(service.create).toHaveBeenCalledWith(createOrderDto);
  });

  it('should add products to an order', async () => {
    const addProductDto: AddProductToOrderDTO = {
      productId: '1223',
      quantity: 12,
    };
    const result = await controller.addProducts('1', addProductDto);
    expect(result.message).toBe('Order updated successfully');
    expect(result.ok).toBe(true);
    expect(service.addProductToOrder).toHaveBeenCalledWith('1', addProductDto);
  });

  it('should remove a product from an order', async () => {
    const result = await controller.deleteProducts('1', 'product1');
    expect(result.message).toBe('Product deleted successfully');
    expect(result.ok).toBe(true);
    expect(service.removeProducts).toHaveBeenCalledWith('1', 'product1');
  });

  it('should return all orders', async () => {
    const result = await controller.getOrders();
    expect(result.message).toBe('All orders retrieved successfully');
    expect(result.ok).toBe(true);
    expect(result.orders).toBeInstanceOf(Array);
    expect(service.findAll).toHaveBeenCalled();
  });
});
