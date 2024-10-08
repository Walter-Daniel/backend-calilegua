import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private idCont = 1;
  private products: Product[] = [
    // podriamos darle un tipo :ANY a nuestro vector de productos pero seria muy genérico
    {
      id: 1,
      name: 'Prod A',
      description: 'Descripcion producto A',
      price: 6500,
      stock: 1,
      origin: 'China',
      image: '',
    },
    {
      id: 2,
      name: 'Prod B',
      description: 'Descripcion producto B',
      price: 7500,
      stock: 1,
      origin: 'Japon',
      image: '',
    },
  ];
  findAll() {
    return this.products;
  }
  totalProducts() {
    return this.products.length;
  }
  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
  remove(id: number) {
    const product = this.products.filter((product) => product.id !== id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
