import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PurchasersController } from './controllers/purchasers.controller';
import { PurchasersService } from './services/purchasers.service';
import { Purchaser, PurchaserSchema } from './entities/purchaser.entity';

import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Purchaser.name,
        schema: PurchaserSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [PurchasersController],
  providers: [PurchasersService],
})
export class OperatorsModule {}
