import { Operator } from './operator.entity';
import { Product } from 'src/products/entities/product.entity';

export class Order {
  // id: number;
  date: Date;
  operator: Operator;
  products: Product[]  
}
