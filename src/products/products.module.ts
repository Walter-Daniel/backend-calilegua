import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product, ProductSchema } from './entities/product.entity';
import {
  Manufacturer,
  ManufacturerSchema,
} from './entities/manufacturer.entity';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ManufacturersService } from './services/manufacturers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Manufacturer.name,
        schema: ManufacturerSchema,
      },
    ]),
  ],
  controllers: [ProductsController, ManufacturersController],
  providers: [ProductsService, ManufacturersService],
  exports: [
    ProductsService,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
