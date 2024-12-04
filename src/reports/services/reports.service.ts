import { Injectable, NotFoundException } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { billReport } from '../documents/bill.reports';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/operators/entities/order.entity';
import { Model } from 'mongoose';
import { OrderModel } from '../models/order.model';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async getBillReport(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('purchaser')
      .populate({
        path: 'detail',
        populate: {
          path: 'items.product',
          model: 'Product',
        },
      })
      .lean<OrderModel>()
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const docDefinition = billReport(order);
    return this.printerService.createPdf(docDefinition);
  }
}
