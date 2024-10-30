import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { Operator } from '../entities/operator.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
    private orders: Order[] = [
        
    ];

    findAll(): Order[] {
        return this.orders;
    }

    totalOrders(): number {
        return this.orders.length;
    }

    findOne(id: number): Order {
      console.log({id})
        return;
    }

    remove(id: number): Order {
        console.log({id})
        return;
    
    }
}