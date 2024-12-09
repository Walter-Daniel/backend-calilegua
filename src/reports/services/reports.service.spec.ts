import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { PrinterService } from './printer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from '../../operators/entities/order.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { billReport } from '../documents/bill.reports';

jest.mock('../documents/bill.reports');

describe('ReportsService', () => {
  let service: ReportsService;
  let printerService: PrinterService;
  let orderModel: Model<Order>;

  const mockPrinterService = {
    createPdf: jest.fn(),
  };

  const mockOrderModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: PrinterService,
          useValue: mockPrinterService,
        },
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    printerService = module.get<PrinterService>(PrinterService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBillReport', () => {
    it('should generate a bill report for a valid order', async () => {
      const orderId = '123';
      const mockOrder = {
        _id: orderId,
        purchaser: { name: 'John Doe' },
        detail: {
          items: [{ product: { name: 'Product 1', price: 10 }, quantity: 2 }],
        },
      };
      const mockDocDefinition = { content: 'Mock PDF Content' };
      const mockPdfDoc = { pipe: jest.fn(), end: jest.fn() };

      mockOrderModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockOrder),
      });

      (billReport as jest.Mock).mockReturnValue(mockDocDefinition);
      mockPrinterService.createPdf.mockReturnValue(mockPdfDoc);

      const result = await service.getBillReport(orderId);

      expect(orderModel.findById).toHaveBeenCalledWith(orderId);
      expect(billReport).toHaveBeenCalledWith(mockOrder);
      expect(printerService.createPdf).toHaveBeenCalledWith(mockDocDefinition);
      expect(result).toBe(mockPdfDoc);
    });

    it('should throw NotFoundException if order is not found', async () => {
      const orderId = '123';

      mockOrderModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getBillReport(orderId)).rejects.toThrow(
        NotFoundException,
      );
      expect(orderModel.findById).toHaveBeenCalledWith(orderId);
    });
  });
});
