import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create product' })
  @Roles(Role.ADMIN)
  @Post()
  async createProduct(@Body() payload: CreateProductDTO) {
    const product = await this.productsService.create(payload);
    console.log('desde controller:', payload);
    return {
      ok: true,
      message: 'Product created successfully',
      product,
    };
  }

  @ApiOperation({ summary: 'Update product' })
  @Roles(Role.ADMIN)
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

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAllProducts(@Query() params: FilterProductDTO) {
    const products = await this.productsService.findAll(params);
    return {
      ok: true,
      message: 'All products retrieved successfully',
      products,
    };
  }

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

  @ApiOperation({ summary: 'Delete product' })
  @Roles(Role.ADMIN)
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
