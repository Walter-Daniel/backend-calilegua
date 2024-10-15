import { Injectable, NotFoundException } from '@nestjs/common';
import { Operator } from '../entities/operator.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OperatorsService {
    constructor(private productService: ProductsService) {}
    private operators: Operator[] = [
        {
            id: 1,
            email: 'example1@email.com',
            password: '123456',
            role: 'admin',
        },
        {
            id: 2,
            email: 'example2@email.com',
            password: '123456',
            role: 'user',
        },
    ];

    findAll() {
        return this.operators;
    }

    totalOperators() {
        return this.operators.length;
    }

    findOne(id: number) {
        const operator = this.operators.find((operator) => operator.id === id);
        if (!operator) {
            throw new NotFoundException(`Operator with ID ${id} not found`);
        }
        return operator;
    }

    remove(id: number) {
        const operator = this.operators.find((operator) => operator.id === id);
        if (!operator) {
            throw new NotFoundException(`Operator with ID ${id} not found`);
        }
        this.operators = this.operators.filter((operator) => operator.id !== id);
        return this.operators;
    }

    getOrderByUser(id: number): Order {
       const operator = this.findOne(id);
       return {
        date: new Date(),
        operator,
        products: this.productService.findAll()
       };
    };
}
