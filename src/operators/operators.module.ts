import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OrdersController } from './controllers/orders.controller';
import { PurchasersController } from './controllers/purchasers.controller';

@Module({
  controllers: [OperatorsController, OrdersController, PurchasersController]
})
export class OperatorsModule {}
