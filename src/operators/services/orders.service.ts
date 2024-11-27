import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('purchaser')
      .populate({
        path: 'products',
        model: 'Product',
      })
      .exec();
    return orders;
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    const newOrder = new this.orderModel(data);
    return await newOrder.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    productsIds.forEach((pId) => order.products.push(pId));
    return order.save();
  }

  async removeProducts(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order;
  }
}
