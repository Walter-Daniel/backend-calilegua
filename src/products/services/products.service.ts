import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  // Buscar todos los productos
  async findAll() {
    return await this.productRepo.find();
  }

  // Filtro utilizando find y like para busqueda parcial de productos por nombre.
  async findByName(productName: string): Promise<Product[]> {
    return await this.productRepo.find({
      where: { name: Like(`%${productName}%`) },
    });
  }

  // Conteo de productos
  async totalProducts() {
    const totalProducts = await this.productRepo.count();
    return totalProducts;
  }

  // Buscar productos y realizar conteo. Se pueden aplicar filtros, paginación, ordenamiento y limites de registros.
  async findAndCount(
    options: FindManyOptions<Product> = {},
  ): Promise<[Product[], number]> {
    return this.productRepo.findAndCount(options);
  }

  // Buscar producto por id (uuid)
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Crear producto
  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    return await this.productRepo.save(newProduct);
  }

  // Atualizar producto de la tabla
  async update(id: string, changes: UpdateProductDTO): Promise<Product> {
    const result = await this.productRepo.update(id, changes);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepo.findOneBy({ id });
  }

  // Eliminar producto de la tabla
  async remove(id: string): Promise<void> {
    const deleteResult = await this.productRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
