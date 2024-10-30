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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //todo: Create product
  @ApiOperation({ summary: 'Create product' })
  @Post()
  async createProduct(@Body() payload: CreateProductDTO) {
    const product = await this.productsService.create(payload);
    return {
      ok: true,
      message: 'Product created successfully',
      product,
    };
  }

  //todo: Update product
  @ApiOperation({ summary: 'Update product' })
  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDTO,
  ) {
    const productToUpdate = await this.productsService.update(productId, body)
    return {
      ok: true,
      message: 'Product updated successfully',
      data: productToUpdate,
    };
  }

  //todo: Get all products
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getAllProducts() {
    const products = await this.productsService.findAll();
    return {
      ok: true,
      message: 'All products retrieved successfully',
      products,
    };
  }

  //todo: Get product by id
  @ApiOperation({ summary: 'Get product by ID' })
  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    const product = await this.productsService.findOne(productId);
    return {
      ok: true,
      message: `Product with ID ${productId} retrieved successfully`,
      product: product,
    };
  }

  //todo: Get product by filter
  @ApiOperation({ summary: 'Get product by filter' })
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

  //todo: Delete product by ID
  @ApiOperation({ summary: 'Delete product' })
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    const products = await this.productsService.remove(productId);
    return {
      ok: true,
      message: 'Product deleted successfully',
      productId: productId,
      delete: true,
      products: products,
    };
  }
}
