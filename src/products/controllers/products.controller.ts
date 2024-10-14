import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';


@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //todo: Create product
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    return {
      ok: true,
      message: 'Product created successfully',
      payload,
    };
  }

  //todo: Update product
  @Put(':productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDTO,
  ): any {
    return {
      ok: true,
      message: 'Product updated successfully',
      productId: productId,
    };
  }

  //todo: Delete product by ID
  @Delete(':productId')
  deleteProduct(@Param('productId', ParseIntPipe) productId: number): any {
    const products = this.productsService.remove(productId);
    return {
      ok: true,
      message: 'Product deleted successfully',
      productId: productId,
      delete: true,
      products: products,
      count: products.length,
    };
  }

  //todo: Get all products
  @Get()
  getAllProducts() {
    const products = this.productsService.findAll();
    return {
      ok: true,
      message: 'All products retrieved successfully',
      products,
    };
  }

  //todo: Get product by id
  @Get(':productId')
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    const id = Number(productId);
    const product = this.productsService.findOne(id);
    return {
      ok: true,
      message: `Product with ID ${productId} retrieved successfully`,
      product: product,
    };
  }

  //todo: Get product by filter
  @Get('filter')
  getProductByFilter(@Query('name') name: string) {
    const filterCriteria: any = {};
    if (name) filterCriteria.name = name;

    return {
      ok: true,
      message: `Products filtered by criteria: ${JSON.stringify(filterCriteria)}`,
      products: [{ id: 1, name: name || 'Product A' }],
    };
  }
}
