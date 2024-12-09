import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from '../services/reports.service';
import { Response } from 'express';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: ReportsService;

  const mockReportsService = {
    getBillReport: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    reportsService = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBillReport', () => {
    it('should get a bill report and send it as a response', async () => {
      const orderId = '123';
      const mockPdfDoc = {
        pipe: jest.fn(),
        end: jest.fn(),
        info: {},
      };
      const mockResponse = {
        setHeader: jest.fn(),
      } as unknown as Response;

      mockReportsService.getBillReport.mockResolvedValue(mockPdfDoc);

      await controller.getBillReport(mockResponse, orderId);

      expect(reportsService.getBillReport).toHaveBeenCalledWith(orderId);
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/pdf',
      );
      expect(mockPdfDoc.pipe).toHaveBeenCalledWith(mockResponse);
      expect(mockPdfDoc.end).toHaveBeenCalled();
    });
  });
});
