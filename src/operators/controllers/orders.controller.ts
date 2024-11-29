import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  AddProductToOrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO,
} from '../dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() payload: CreateOrderDTO) {
    const order = await this.ordersService.create(payload);
    return {
      ok: true,
      message: 'Order created successfully',
      order,
    };
  }

  @Put(':id/products')
  async addProducts(
    @Param('id') id: string,
    @Body() payload: AddProductToOrderDTO,
  ) {
    const orderToUpdate = await this.ordersService.addProductToOrder(
      id,
      payload,
    );
    return {
      ok: true,
      message: 'Order updated successfully',
      order: orderToUpdate,
    };
  }

  @Delete(':id/product/:productId')
  async deleteProducts(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    const order = await this.ordersService.removeProducts(id, productId);
    return {
      ok: true,
      message: 'Product deleted successfully',
      order,
    };
  }

  @Get()
  async getOrders() {
    const orders = await this.ordersService.findAll();
    console.log({ orders });
    return {
      ok: true,
      message: 'All orders retrieved successfully',
      orders,
    };
  }
}
