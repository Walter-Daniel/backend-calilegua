import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/orderDetail.entity';
import { Product } from '../../products/entities/product.entity';
import { Model } from 'mongoose';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<Order>;
  let orderDetailModel: Model<OrderDetail>;
  let productModel: Model<Product>;

  const mockOrderModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  const mockOrderDetailModel = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  const mockProductModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(OrderDetail.name),
          useValue: mockOrderDetailModel,
        },
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
    orderDetailModel = module.get<Model<OrderDetail>>(
      getModelToken(OrderDetail.name),
    );
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const mockOrders = [{ id: '1', purchaser: 'user1', detail: 'detail1' }];
      jest.spyOn(orderModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockOrders),
          }),
        }),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(mockOrders);
      expect(orderModel.find).toHaveBeenCalled();
    });
  });
});
