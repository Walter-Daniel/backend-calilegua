import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

import { ManufacturersController } from './controllers/manufacturers.controller';
import { ManufacturersService } from './services/manufacturers.service';
import { Manufacturer } from './entities/manufacturer.entity';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [],
  controllers: [
    CategoriesController,
    ManufacturersController,
    ProductsController,
  ],
  providers: [CategoriesService, ManufacturersService, ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
