import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { Operator } from '../entities/operator.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
    private orders: Order[] = [
        {
            // id: 1,
            date: new Date(),
            operator: {
                id: 1,
                email: 'example1@email.com',
                password: '123456',
                role: 'admin',
            } as Operator,
            products: [
                { id: 1, name: 'Product 1', price: 100 } as Product,
                { id: 2, name: 'Product 2', price: 200 } as Product,
            ],
        },
        {
            // id: 2,
            date: new Date(),
            operator: {
                id: 1,
                email: 'example2@email.com',
                password: '123456',
                role: 'user',
            } as Operator,
            products: [
                { id: 3, name: 'Product 3', price: 150 } as Product,
            ],
        },
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