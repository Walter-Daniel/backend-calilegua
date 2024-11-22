// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Post,
//     Put,
// } from '@nestjs/common';
// import { OrderDetailService } from '../services/order-detail.service';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from '../dtos/orderDetail.dto';

// @ApiTags('Order detail')
// @Controller('order-detail')
// export class OrderDetailController {
//     constructor(
//         private orderDetailService: OrderDetailService,
//     ){}

//     @ApiOperation({ summary: 'Create order detail' })
//     @Post()
//     async createOrderDetail(@Body() payload: CreateOrderDetailDTO) {
//         const orderDetail = await this.orderDetailService.create(payload)
//         return {
//             ok: true,
//             message: 'Order detail created successfully',
//             orderDetail
//         };
//     }

//     @ApiOperation({ summary: 'Update order detail' })
//     @Put(':orderDetailId')
//     async updateOrderDetail(
//         @Param('orderDetailId') orderId: string,
//         @Body() body: UpdateOrderDetailDTO,
//     ) {
//         const orderDetailToUpdate = await this.orderDetailService.update(orderId, body)
//         return {
//             ok: true,
//             message: 'Order updated successfully',
//             orderDetail: orderDetailToUpdate
//         };
//     }

//     @ApiOperation({ summary: 'Delete order detail' })
//     @Delete(':orderDetailId')
//     async deleteOrderDetail(@Param('orderDetailId') orderDetailId: string) {
//         await this.orderDetailService.remove(orderDetailId);
//         return {
//             ok: true,
//             message: 'Order detail deleted successfully',
//         };
//     }

//     @ApiOperation({ summary: 'Get all order detail' })
//     @Get()
//     getOrdersDetail() {
//         const orders = this.orderDetailService.findAll();
//         return {
//             ok: true,
//             message: 'All orders detail retrieved successfully',
//             orders,
//         };
//     }

//     @ApiOperation({ summary: 'Get order detail by ID' })
//     @Get(':orderDetailId')
//     async getOrderById(@Param('orderDetailId') orderDetailId: string) {
//         const order = await this.orderDetailService.findOne(orderDetailId);
//         return {
//             ok: true,
//             message: `Order with ID ${orderDetailId} retrieved successfully`,
//             order,
//         };
//     }
// }
