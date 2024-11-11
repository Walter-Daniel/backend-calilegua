import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { ManufacturersService } from './manufacturers.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private manufacturersService: ManufacturersService,
    private categoriesService: CategoriesService,
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
    const product = await this.productRepo.findOne({
      where: {id},
      relations: ['manufacturer', 'categories']
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Crear producto
  async create(data: CreateProductDTO) {
    console.log({data})
    const newProduct = this.productRepo.create(data);
    if(data.manufacturerId){
      const manufacturer = await this.manufacturersService.findOne(data.manufacturerId);
      newProduct.manufacturer= manufacturer
    }
    if(data.categoriesId && data.categoriesId.length > 0){
      const categories = await this.categoriesService.findMultipleCategoriesByIds(data.categoriesId);
      newProduct.categories = categories;
    }
    return await this.productRepo.save(newProduct);
  }

  // Atualizar producto de la tabla
  async update(id: string, changes: UpdateProductDTO): Promise<Product> {
    const product = await this.findOne(id);
    if(changes.manufacturerId){
      const manufacturer = await this.manufacturersService.findOne(changes.manufacturerId);
      if(!manufacturer){
        throw new NotFoundException(`Manufacturer with ID ${id} not found`);
      }
      product.manufacturer = manufacturer;
    }
    if(changes.categoriesId){
      const categories = await this.categoriesService.findMultipleCategoriesByIds(changes.categoriesId);
      if(!categories){
        throw new NotFoundException(`Categories with IDs ${id} not found`);
      }
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return await this.productRepo.save(product);
  }

  // Eliminar producto de la tabla
  async remove(id: string): Promise<void> {
    const deleteResult = await this.productRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
