// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import {
//   CreateOrderDetailDTO,
//   UpdateOrderDetailDTO,
// } from '../dtos/orderDetail.dto';

// import { OrderDetail } from '../entities/orderDetail.entity';
// import { Order } from '../entities/order.entity';
// import { Product } from 'src/products/entities/product.entity';

// @Injectable()
// export class OrderDetailService {
//   constructor(
//     @InjectRepository(OrderDetail)
//     private orderDetailRepo: Repository<OrderDetail>,
//     @InjectRepository(Order) private orderRepo: Repository<Order>,
//     @InjectRepository(Product) private productRepo: Repository<Product>,
//   ) {}

//   async create(data: CreateOrderDetailDTO) {
//     const order = await this.orderRepo.findOneBy({ id: data.orderId });
//     if (!order)
//       throw new NotFoundException(`Order with ID ${data.orderId} not found`);
//     const product = await this.productRepo.findOneBy({ id: data.productId });
//     if (!product)
//       throw new NotFoundException(
//         `Product with ID ${data.productId} not found`,
//       );

//     const orderDetail = new OrderDetail();
//     orderDetail.product = product;
//     orderDetail.order = order;
//     orderDetail.quantity = data.quantity;
//     orderDetail.totalPrice = product.price * data.quantity;
//     return await this.orderDetailRepo.save(orderDetail);
//   }

//   async update(id: string, changes: UpdateOrderDetailDTO) {
//     const orderDetail = await this.findOne(id);

//     let updatedProduct: Product | null = null;
//     let updatedOrder: Order | null = null;

//     //Realizamos la consulta solo sí el orderId ingresado es diferente al del detalle original
//     if (changes.orderId && changes.orderId !== orderDetail.order.id) {
//       updatedOrder = await this.orderRepo.findOneBy({ id: changes.orderId });
//       if (!updatedOrder) {
//         throw new NotFoundException(
//           `Order with ID ${changes.orderId} not found`,
//         );
//       }
//     }

//     //Realizamos la consulta solo sí el productId ingresado es diferente al del detalle original
//     if (changes.productId && changes.productId !== orderDetail.product.id) {
//       updatedProduct = await this.productRepo.findOneBy({
//         id: changes.productId,
//       });
//       if (!updatedProduct) {
//         throw new NotFoundException(
//           `Product with ID ${changes.productId} not found`,
//         );
//       }
//     }

//     /* Si se realiza un cambio en el valor de la cantidad de productos, ese nuevo valor se almacena en la constante updatedQuantity,
//       pero si no cambia, permanece con su valor original. */
//     const updatedQuantity = changes.quantity ?? orderDetail.quantity;
//     const productPrice = updatedProduct
//       ? updatedProduct.price
//       : orderDetail.product.price;
//     const updatedTotalPrice = productPrice * updatedQuantity;

//     //Nos aseguramos que el valor del precio total siempre sea positivo
//     if (updatedTotalPrice <= 0) {
//       throw new BadRequestException('Total price must be greater than zero');
//     }

//     const updatedOrderDetail = {
//       ...orderDetail,
//       order: updatedOrder || orderDetail.order,
//       product: updatedProduct || orderDetail.product,
//       quantity: updatedQuantity,
//       totalPrice: updatedTotalPrice,
//     };

//     return await this.orderDetailRepo.save(updatedOrderDetail);
//   }

//   async remove(id: string) {
//     const deleteResult = await this.orderDetailRepo.delete(id);
//     if (deleteResult.affected === 0) {
//       throw new NotFoundException(`Order detail with ID #${id} not found`);
//     }
//   }

//   async findAll() {
//     return await this.orderDetailRepo.find({
//       relations: ['product', 'order'],
//     });
//   }

//   async findOne(id: string) {
//     const orderDetail = await this.orderDetailRepo.findOne({
//       where: { id },
//       relations: ['product', 'order'],
//     });
//     if (!orderDetail)
//       throw new NotFoundException(`Order detail with ID #${id} not found`);
//     return orderDetail;
//   }
// }
