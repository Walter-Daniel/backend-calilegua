import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OrdersController } from './controllers/orders.controller';
import { PurchasersController } from './controllers/purchasers.controller';
import { OperatorsService } from './services/operators.service';
import { OrdersService } from './services/orders.service';
import { PurchasersService } from './services/purchasers.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[ProductsModule],
  controllers: [
    OperatorsController, 
    OrdersController, 
    PurchasersController
  ],
  providers: [
    OperatorsService, 
    OrdersService, 
    PurchasersService
  ]
})
export class OperatorsModule {}
