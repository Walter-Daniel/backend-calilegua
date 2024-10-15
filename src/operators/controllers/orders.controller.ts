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
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post()
    createOrder(@Body() payload: CreateOrderDTO) {
        return {
            ok: true,
            message: 'Order created successfully',
            payload,
        };
    }

    @Put(':orderId')
    updateOrder(
        @Param('orderId') orderId: string,
        @Body() body: UpdateOrderDTO,
    ) {
        return {
            ok: true,
            message: 'Order updated successfully',
            data: body,
        };
    }

    @Delete(':orderId')
    deleteOrder(@Param('orderId', ParseIntPipe) orderId: number) {
        const orders = this.ordersService.remove(orderId);
        return {
            ok: true,
            message: 'Order deleted successfully',
            orderId,
            delete: true,
            orders,
        };
    }

    @Get()
    getAllOrders() {
        const orders = this.ordersService.findAll();
        return {
            ok: true,
            message: 'All orders retrieved successfully',
            orders,
        };
    }

    @Get(':orderId')
    getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
        const order = this.ordersService.findOne(orderId);
        return {
            ok: true,
            message: `Order with ID ${orderId} retrieved successfully`,
            order,
        };
    }
}
