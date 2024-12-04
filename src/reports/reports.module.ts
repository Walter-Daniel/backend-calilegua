import { Module } from '@nestjs/common';
import { PrinterService } from './services/printer.service';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';
import { OperatorsModule } from 'src/operators/operators.module';

@Module({
  imports: [OperatorsModule],
  controllers: [ReportsController],
  providers: [PrinterService, ReportsService],
  exports: [PrinterService, ReportsService],
})
export class ReportsModule {}
