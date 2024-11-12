import { Module } from '@nestjs/common';

import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { Operator } from './entities/operator.entity';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

import { PurchasersController } from './controllers/purchasers.controller';
import { PurchasersService } from './services/purchasers.service';
import { Purchaser } from './entities/purchaser.entity';

import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';

@Module({
  imports:[ProductsModule, TypeOrmModule.forFeature([Operator, Purchaser, Order, OrderDetail])],
  controllers: [
    OperatorsController, 
    OrdersController, 
    PurchasersController,
  ],
  providers: [
    OperatorsService, 
    OrdersService, 
    PurchasersService
  ]
})
export class OperatorsModule {}
