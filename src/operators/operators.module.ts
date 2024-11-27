import { Module } from '@nestjs/common';

import { PurchasersController } from './controllers/purchasers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchasersService } from './services/purchasers.service';
import { Purchaser, PurchaserSchema } from './entities/purchaser.entity';

import { ProductsModule } from 'src/products/products.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

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
    ]),
    ProductsModule,
  ],
  controllers: [PurchasersController, OrdersController],
  providers: [PurchasersService, OrdersService],
})
export class OperatorsModule {}
