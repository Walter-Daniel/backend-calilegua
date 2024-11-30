import { Module } from '@nestjs/common';

import { PurchasersController } from './controllers/purchasers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchasersService } from './services/purchasers.service';
import { Purchaser, PurchaserSchema } from './entities/purchaser.entity';

import { ProductsModule } from 'src/products/products.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderDetail, OrderDetailSchema } from './entities/orderDetail.entity';
import { OperatorsService } from './services/operators.service';
import { OperatorsController } from './controllers/operators.controller';
import { Operator, OperatorSchema } from './entities/operators.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Purchaser.name,
        schema: PurchaserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: OrderDetail.name,
        schema: OrderDetailSchema,
      },
      {
        name: Operator.name,
        schema: OperatorSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [PurchasersController, OrdersController, OperatorsController],
  providers: [PurchasersService, OrdersService, OperatorsService],
})
export class OperatorsModule {}
