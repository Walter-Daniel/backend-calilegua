import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ProductsController } from './controllers/products.controller';


@Module({
  controllers: [CategoriesController, ManufacturersController, ProductsController]
})
export class ProductsModule {}
