import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //todo: Create product
  @ApiOperation({ summary: 'Create product' })
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    this.productsService.create(payload);
    return {
      ok: true,
      message: 'Product created successfully',
    };
  }

  //   //todo: Update product
  @ApiOperation({ summary: 'Update product' })
  @Put(':productId')
  async updateProduct(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDTO,
  ) {
    const productToUpdate = await this.productsService.update(
      productId,
      payload,
    );
    return {
      ok: true,
      message: 'Product updated successfully',
      data: productToUpdate,
    };
  }

  //   //todo: Get all products
  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getAllProducts(@Query() params: FilterProductDTO) {
    const products = await this.productsService.findAll(params);
    return {
      ok: true,
      message: 'All products retrieved successfully',
      products,
    };
  }

  //   //todo: Get product by id
  @ApiOperation({ summary: 'Get product by ID' })
  @Get(':productId')
  async getProductById(@Param('productId', MongoIdPipe) productId: string) {
    const product = await this.productsService.findOne(productId);
    return {
      ok: true,
      message: `Product with ID ${productId} retrieved successfully`,
      product: product,
    };
  }

  //   //todo: Delete product by ID
  @ApiOperation({ summary: 'Delete product' })
  @Delete(':productId')
  async deleteProduct(@Param('productId', MongoIdPipe) productId: string) {
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
