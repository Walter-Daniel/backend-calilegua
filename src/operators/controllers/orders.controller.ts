import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  AddProtuctToOrderDTO,
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
    @Body() payload: AddProtuctToOrderDTO,
  ) {
    const orderToUpdate = await this.ordersService.addProducts(
      id,
      payload.productsIds,
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
    await this.ordersService.removeProducts(id, productId);
    return {
      ok: true,
      message: 'Order deleted successfully',
    };
  }
  // @Put(':orderId')
  // async updateOrder(
  //     @Param('orderId') orderId: string,
  //     @Body() body: UpdateOrderDTO,
  // ) {
  //     const orderToUpdate = await this.ordersService.update(orderId, body)
  //     return {
  //         ok: true,
  //         message: 'Order updated successfully',
  //         order: orderToUpdate
  //     };
  // }

  // @Delete(':orderId')
  // async deleteOrder(@Param('orderId') orderId: string) {
  //   await this.ordersService.remove(orderId);
  //   return {
  //     ok: true,
  //     message: 'Order deleted successfully',
  //   };
  // }

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

  // @Get(':orderId')
  // async getOrderById(@Param('orderId') orderId: string) {
  //   const order = await this.ordersService.findOne(orderId);
  //   return {
  //     ok: true,
  //     message: `Order with ID ${orderId} retrieved successfully`,
  //     order,
  //   };
  // }
}
