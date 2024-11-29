import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import {
  AddProductToOrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO,
} from '../dtos/order.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDetail } from '../entities/orderDetail.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('purchaser')
      .populate('detail')
      .exec();
    return orders;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('detail').exec();
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    try {
      const { purchaserId, items } = data;

      const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await this.getProductById(item.productId);
          return {
            product: item.productId,
            quantity: item.quantity,
            subtotal: product.price * item.quantity,
          };
        }),
      );

      const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

      const orderDetail = new this.orderDetailModel({
        items: orderItems,
        total,
      });
      await orderDetail.save();

      const order = new this.orderModel({
        purchaser: purchaserId,
        detail: orderDetail._id,
      });
      await order.save();

      return order;
    } catch (error) {
      throw new Error('Unexpected error occurred');
    }
  }

  async addProductToOrder(orderId: string, data: AddProductToOrderDTO) {
    const { productId, quantity } = data;
    const order = await this.getOrderById(orderId);
    const product = await this.getProductById(productId);
    const orderDetail = await this.orderDetailModel.findById(order.detail);

    //Buscar productos en el array de detalles
    const existingItem = orderDetail.items.find(
      (item) => item.product.toString() === productId,
    );

    // Si existe el producto, se aumenta la cantidad de producto en detalle
    // Si no existe el producto, se lo agrega al array del detalle
    const id = new Types.ObjectId(productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * product.price;
    } else {
      orderDetail.items.push({
        product: id,
        quantity,
        subtotal: quantity * product.price,
      });
    }

    // Suma del subtotal del producto agregado
    orderDetail.total = orderDetail.items.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );
    await orderDetail.save();

    const updatedOrder = await this.getOrderById(orderId);
    return updatedOrder;
  }

  async removeProducts(id: string, productId: string) {
    const order = await this.getOrderById(id);
    const orderDetail = await this.orderDetailModel.findById(order.detail);

    //Buscar productos en el array de detalles
    const productIndex = orderDetail.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (productIndex === -1) {
      throw new Error('Product not found in order detail');
    }

    // Eliminar el producto del detalle
    orderDetail.items.splice(productIndex, 1);

    // Modificar el precio total
    orderDetail.total = orderDetail.items.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );
    await orderDetail.save();
    const updatedOrder = await this.getOrderById(id);
    return updatedOrder;
  }
}
