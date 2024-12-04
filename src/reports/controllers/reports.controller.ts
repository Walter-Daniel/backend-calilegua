import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':id/bill')
  async getBillReport(@Res() response: Response, @Param('id') id: string) {
    const pdfDoct = await this.reportsService.getBillReport(id);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoct.info.Title = 'Factura';
    pdfDoct.pipe(response);
    pdfDoct.end();
    return {
      hola: 'mundo',
    };
  }
}
