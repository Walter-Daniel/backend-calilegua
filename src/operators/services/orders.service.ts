import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchaser } from '../entities/purchaser.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order.dto';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Purchaser) private purchaserRepo: Repository<Purchaser>,
    ){}

    async findAll() {
        return await this.orderRepo.findAndCount();
    }

    async findOne(id: string){
        const order = await this.orderRepo.findOne({
            where: { id },
            // relations: ['details'],
          });
          if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
          }
          return order;
    }

    async create(data: CreateOrderDTO){
        const order = new Order();
        if(data.purchaserId) {
            const purchaser = await this.purchaserRepo.findOneBy({id: data.purchaserId});
            order.purchaser = purchaser;
        }
        return this.orderRepo.save(order);
    }

    async update(id: string, changes: UpdateOrderDTO){
        const order = await this.orderRepo.findOneBy({id});
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        if(changes.purchaserId){
            const purchaser = await this.purchaserRepo.findOneBy({id: changes.purchaserId}); 
            order.purchaser = purchaser;
        }
        return this.orderRepo.save(order);
    }

    async remove(id: string) {
        return await this.orderRepo.delete(id);
    }
}