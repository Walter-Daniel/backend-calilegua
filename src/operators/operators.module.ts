import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { Operator } from './entities/operator.entity';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';

import { PurchasersController } from './controllers/purchasers.controller';
import { PurchasersService } from './services/purchasers.service';
import { Purchaser } from './entities/purchaser.entity';

import { OrderDetailController } from './controllers/order-detail.controller';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetail } from './entities/orderDetail.entity';

import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[ProductsModule, TypeOrmModule.forFeature([Operator, Purchaser, Order, OrderDetail])],
  controllers: [
    OperatorsController, 
    OrdersController, 
    PurchasersController, 
    OrderDetailController,
  ],
  providers: [
    OperatorsService, 
    OrdersService, 
    PurchasersService, 
    OrderDetailService
  ]
})
export class OperatorsModule {}
